import { User, Product, Order, Coupon, GiftVoucher, DashboardStats, ChartData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro 15"',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    stock: 25,
    status: 'active',
    createdAt: '2024-01-10',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    price: 299.99,
    category: 'Electronics',
    stock: 50,
    status: 'active',
    createdAt: '2024-01-12',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker',
    price: 89.99,
    category: 'Home & Kitchen',
    stock: 30,
    status: 'active',
    createdAt: '2024-01-15',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    products: [
      { productId: '1', productName: 'Laptop Pro 15"', quantity: 1, price: 1299.99 }
    ],
    total: 1299.99,
    status: 'delivered',
    createdAt: '2024-01-16'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    products: [
      { productId: '2', productName: 'Wireless Headphones', quantity: 2, price: 299.99 }
    ],
    total: 599.98,
    status: 'shipped',
    createdAt: '2024-01-18'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    products: [
      { productId: '3', productName: 'Coffee Maker', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: 'processing',
    createdAt: '2024-01-20'
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    description: '10% off for new customers',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 50,
    maxUsage: 100,
    usedCount: 25,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active'
  },
  {
    id: '2',
    code: 'SAVE20',
    description: '$20 off orders over $100',
    discountType: 'fixed',
    discountValue: 20,
    minOrderValue: 100,
    maxUsage: 50,
    usedCount: 12,
    validFrom: '2024-01-15',
    validTo: '2024-06-30',
    status: 'active'
  }
];

export const mockGiftVouchers: GiftVoucher[] = [
  {
    id: '1',
    code: 'GV-001-2024',
    value: 50,
    recipientEmail: 'recipient@example.com',
    senderName: 'John Doe',
    message: 'Happy Birthday!',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    code: 'GV-002-2024',
    value: 100,
    recipientEmail: 'friend@example.com',
    senderName: 'Jane Smith',
    message: 'Congratulations on your new job!',
    status: 'redeemed',
    createdAt: '2024-01-15',
    redeemedAt: '2024-01-20'
  }
];

export const mockStats: DashboardStats = {
  totalUsers: 1245,
  totalOrders: 3892,
  totalRevenue: 125480.50,
  totalProducts: 247
};

export const mockChartData: Record<string, ChartData[]> = {
  '1M': [
    { name: 'Week 1', orders: 120, revenue: 15800 },
    { name: 'Week 2', orders: 145, revenue: 18200 },
    { name: 'Week 3', orders: 135, revenue: 17100 },
    { name: 'Week 4', orders: 160, revenue: 21300 },
  ],
  '3M': [
    { name: 'Month 1', orders: 420, revenue: 52400 },
    { name: 'Month 2', orders: 380, revenue: 48200 },
    { name: 'Month 3', orders: 460, revenue: 58900 },
  ],
  '6M': [
    { name: 'Jan', orders: 320, revenue: 42000 },
    { name: 'Feb', orders: 380, revenue: 48200 },
    { name: 'Mar', orders: 460, revenue: 58900 },
    { name: 'Apr', orders: 420, revenue: 52400 },
    { name: 'May', orders: 490, revenue: 62100 },
    { name: 'Jun', orders: 520, revenue: 65800 },
  ],
  '1Y': [
    { name: 'Q1', orders: 1160, revenue: 149100 },
    { name: 'Q2', orders: 1430, revenue: 180300 },
    { name: 'Q3', orders: 1280, revenue: 164200 },
    { name: 'Q4', orders: 1350, revenue: 173400 },
  ]
};