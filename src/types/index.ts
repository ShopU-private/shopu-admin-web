
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