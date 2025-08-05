export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxUsage: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'inactive';
}

export interface GiftVoucher {
  id: string;
  code: string;
  value: number;
  recipientEmail: string;
  senderName: string;
  message: string;
  status: 'active' | 'redeemed' | 'expired';
  createdAt: string;
  redeemedAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export interface ChartData {
  name: string;
  orders: number;
  revenue: number;
}

export type FilterPeriod = '1M' | '3M' | '6M' | '1Y';