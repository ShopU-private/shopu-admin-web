import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { formatPrice } from '../../utils/formatter';
import OrderCreate from './OrderCreate'
import { OrderListResponse } from '../../types/order';

const PAGE_SIZE = 20;

const Orders: React.FC = () => {
  const { fetchWithAuth } = useAuth();
  const [orders, setOrders] = useState<OrderListResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'create'>('list');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const url = `/api/v1/order/all/${page}/${PAGE_SIZE}`;
        const data = await fetchWithAuth(url, { method: 'GET' });
        setOrders(data?.data?.content || []);
        setTotalPages(data?.data?.totalPages || 1);
      } catch (err) {
        console.log("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page, fetchWithAuth]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed'.toUpperCase() : return 'bg-yellow-50 text-orange-500';
      case 'shipped'.toUpperCase(): return 'bg-purple-100 text-purple-800';
      case 'delivered'.toUpperCase(): return 'bg-green-100 text-green-800';
      case 'cancelled'.toUpperCase(): return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (view === 'create') {
    return <OrderCreate onBack={() => setView('list')} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <button
          onClick={() => setView('create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Order</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading orders...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.receiverName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.totalItem} item{order.totalItem !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{formatPrice(order.orderAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-2 p-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page < 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 === totalPages || orders.length === 0}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;