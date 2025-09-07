import React, { useState, useEffect } from 'react';
import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCard';
import { mockStats, mockChartData } from '../../data/mockData';
import { FilterPeriod } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>('1M');
  const { fetchWithAuth } = useAuth();

  // Add state for counts
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  // Add state for sales summary
  const [salesSummary, setSalesSummary] = useState<{ totalSales: number; upcomingSales: number }>({
    totalSales: 0,
    upcomingSales: 0,
  });

  useEffect(() => {
    // Fetch counts from API
    const fetchCounts = async () => {
      try {
        const productRes = await fetchWithAuth('/api/v1/products/count', { method: 'GET' });
        const userRes = await fetchWithAuth('/api/v1/users/count', { method: 'GET' });
        const orderRes = await fetchWithAuth('/api/v1/order/count', { method: 'GET' });

        setCounts({
          totalProducts: Number(productRes?.data ?? 0),
          totalUsers: Number(userRes?.data ?? 0),
          totalOrders: Number(orderRes?.data ?? 0),
        });
      } catch (err) {
        setCounts({ totalUsers: 0, totalProducts: 0, totalOrders: 0 });
      }
    };

    // Fetch sales summary from API
    const fetchSalesSummary = async () => {
      try {
        const res = await fetchWithAuth('/api/v1/order/sale/summary', { method: 'GET' });
        setSalesSummary({
          totalSales: Number(res?.data?.totalSales ?? 0),
          upcomingSales: Number(res?.data?.upcomingSales ?? 0),
        });
      } catch (err) {
        setSalesSummary({ totalSales: 0, upcomingSales: 0 });
      }
    };

    fetchCounts();
    fetchSalesSummary();
  }, [fetchWithAuth]);

  const periodOptions: { value: FilterPeriod; label: string }[] = [
    { value: '1M', label: 'Last 1 Month' },
    { value: '3M', label: 'Last 3 Months' },
    { value: '6M', label: 'Last 6 Months' },
    { value: '1Y', label: 'Last 1 Year' },
  ];

  const chartData = mockChartData[selectedPeriod];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={counts.totalUsers.toLocaleString()}
          icon={Users}
          change="12%"
          changeType="positive"
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Orders"
          value={counts.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          change="8%"
          changeType="positive"
          color="bg-green-500"
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${salesSummary.totalSales.toLocaleString()}`}
          icon={DollarSign}
          change="15%"
          changeType="positive"
          color="bg-purple-500"
        />
        <StatsCard
          title="Upcoming Revenue"
          value={`₹${salesSummary.upcomingSales.toLocaleString()}`}
          icon={DollarSign}
          change="--"
          changeType="positive"
          color="bg-purple-400"
        />
        <StatsCard
          title="Total Products"
          value={counts.totalProducts.toLocaleString()}
          icon={Package}
          change="3%"
          changeType="positive"
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Orders Overview</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as FilterPeriod)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as FilterPeriod)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New order #1234 received</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User Jane Smith registered</p>
              <p className="text-xs text-gray-600">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Product "Wireless Headphones" updated</p>
              <p className="text-xs text-gray-600">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;