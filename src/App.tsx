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

function App() {
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
                    <Route path="/orders" element={<Orders />} />
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