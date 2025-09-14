import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignIn from './components/Auth/SignIn';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Coupons from './components/Offers/Coupons';
import GiftVouchers from './components/Offers/GiftVouchers';
import SearchOrder from './components/Orders/SearchOrder';
import CreateProduct from './components/Products/CreateProduct';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Simple device detection
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      if (
        width < 1024 ||
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      ) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Unsupported Device</h1>
          <p className="text-gray-700 mb-4">
            For security and best experience, please open this admin dashboard on a desktop or laptop.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/createProducts" element={<CreateProduct />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/searchOrder" element={<SearchOrder />} />
                    <Route path="/offers" element={<Navigate to="/offers/coupons" replace />} />
                    <Route path="/offers/coupons" element={<Coupons />} />
                    <Route path="/offers/gift-vouchers" element={<GiftVouchers />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;