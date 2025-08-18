
// export const fetchWithAuth = async (
//   url: string,
//   {
//     method = 'GET',
//     headers = {},
//     queryParams = {},
//     body = null,
//   }: {
//     method?: string;
//     headers?: HeadersInit;
//     queryParams?: Record<string, string | number | boolean>;
//     body?: any;
//   } = {}
// ) => {
//   const token = getCookie('token');
//   if (!token) {
//     logout();
//     return null;
//   }

//   // Append query params if present
//   const urlObj = new URL(url, window.location.origin);
//   Object.entries(queryParams).forEach(([key, value]) => {
//     urlObj.searchParams.append(key, String(value));
//   });

//   // Merge headers
//   const mergedHeaders: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...headers,
//     Authorization: `Bearer ${token}`,
//   };

//   // Prepare fetch options
//   const fetchOptions: RequestInit = {
//     method,
//     headers: mergedHeaders,
//   };

//   if (body && method !== 'GET') {
//     fetchOptions.body = JSON.stringify(body);
//   }

//   // Call API
//   const res = await fetch(urlObj.toString(), fetchOptions);

//   if (res.status === 401) {
//     logout();
//     return null;
//   }

//   const contentType = res.headers.get('content-type') || '';
//   if (!contentType.toLowerCase().includes('application/json')) {
//     console.error('Expected JSON but got:', contentType);
//     console.log('Content-Type from server:', res.headers.get('content-type'));
//     return null;
//   }

//   return await res.json();
// };
