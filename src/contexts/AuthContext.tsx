import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppResponse } from '../utils/appResponse';
// Simple cookie helpers
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}
function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}
function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

interface AuthUser {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

interface FetchWithAuthOptions {
  method?: string;
  headers?: HeadersInit;
  queryParams?: Record<string, string | number | boolean>;
  body?: any;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  sendOtp: (phone: string) => Promise<{ success: boolean; id?: string; error?: string }>;
  verifyOtp: (otp: string) => Promise<AppResponse>;
  otpSessionId: string | null;
  phoneNumber: string | null;
  logout: () => void;
  fetchWithAuth: (url: string, options?: FetchWithAuthOptions) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = "https://shopu-app-569380346480.europe-west1.run.app"//"http://localhost:8080";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  // Send OTP to phone number
  const sendOtp = async (phone: string): Promise<{ success: boolean; id?: string; error?: string }> => {
    try {
      const url = `${API_BASE_URL}/auth/admin/send-otp?phoneNumber=${encodeURIComponent(phone)}`;
      const res = await fetch(url, {
        method: 'POST',

      });
      console.log(res)
      if (!res.ok) {
        return { success: false, error: 'Failed to send OTP' };
      }
      const response = await res.json();
      if (response && response.status === 200 && response.data) {
        setOtpSessionId(response.data);
        setPhoneNumber(phone);
        return { success: true, id: response.data };
      }
      return { success: false, error: response?.message || 'No id returned' };
    } catch (e) {
      return { success: false, error: 'Network error' };
    }
  };

  // OTP verification and login
 const verifyOtp = async (otp: string): Promise<AppResponse> => {
  if (!otpSessionId || !phoneNumber) {
    return { status: 400, message: "Session expired" , data: null};
  }
  try {
    const res = await fetch(`${API_BASE_URL}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        otp,
        smsId: otpSessionId,
      })
    });

    const response = await res.json();

    if (res.ok && response?.status === 200 && response?.data?.token) {
      setCookie('token', response.data.token);
      setUser({ id: otpSessionId, phone: phoneNumber });
    }

    return {
      status: response?.status ?? res.status,
      message: response?.message ?? res.statusText,
      data: response?.data ?? null
    };
  } catch (err) {
    return { status: 500, message: 'Something went wrong', data: null };
  }
};


 const logout = () => {
    setUser(null);
    setOtpSessionId(null);
    setPhoneNumber(null);
    deleteCookie('token');
  };

  // Check token on mount and on every API call
  React.useEffect(() => {
    const token = getCookie('token');
    if (token) {
      // Optionally: decode and check expiry if JWT, or ping a /me endpoint
      // For now, just set user as authenticated if token exists
      if (!user) setUser({ id: 'token' });
    } else {
      setUser(null);
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
  }, []);

  // Helper for API calls with token and auto-logout on 401/expired
const fetchWithAuth = async (
  url: string,
  {
    method = 'GET',
    headers = {},
    queryParams = {},
    body = null,
  }: {
    method?: string;
    headers?: HeadersInit;
    queryParams?: Record<string, string | number | boolean>;
    body?: any;
  } = {}
) => {
  const token = getCookie('token');
  if (!token) {
    logout();
    return null;
  }

  // Append query params if present
  const urlObj = new URL(`${API_BASE_URL}${url}`, window.location.origin);
  Object.entries(queryParams).forEach(([key, value]) => {
    urlObj.searchParams.append(key, String(value));
  });

  // Merge headers
  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
    Authorization: `Bearer ${token}`,
  };

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: mergedHeaders,
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  // Call API
  const res = await fetch(urlObj.toString(), fetchOptions);

  if (res.status === 401) {
    logout();
    return null;
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    console.error('Expected JSON but got:', contentType);
    console.log('Content-Type from server:', res.headers.get('content-type'));
    return null;
  }

  return await res.json();
};




  const value = {
    user,
    isAuthenticated: !!user,
    sendOtp,
    verifyOtp,
    otpSessionId,
    phoneNumber,
    logout,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};