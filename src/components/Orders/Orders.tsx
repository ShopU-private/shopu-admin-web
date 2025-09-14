import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OrderCreate from './OrderCreate'
import { OrderListResponse, OrderStatus } from '../../types/order';
import { useNavigate } from 'react-router-dom';
import OrderCard from './OrderCard';

const PAGE_SIZE = 20;

const Orders: React.FC = () => {
  const { fetchWithAuth } = useAuth();
  const [orders, setOrders] = useState<OrderListResponse[]>([]);
  const [view, setView] = useState<'list' | 'create'>('list');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const url = `/api/v1/order/all/web/${page}/${PAGE_SIZE}`;
        const data = await fetchWithAuth(url, {
          method: 'GET',
          queryParams: {
            status: orderStatus || ''
          }
        });
        setOrders(data?.data?.content || []);
        setTotalPages(data?.data?.totalPages || 1);
      } catch (err) {
        console.log("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page, fetchWithAuth, orderStatus]);

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
            <div
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center"
              onClick={() => navigate('/searchOrder')}
            >
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <span className="text-gray-500">Search orders...</span>
            </div>
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
                    <select
                      value={orderStatus}
                      onChange={e => {
                        setOrderStatus(e.target.value);
                        setPage(0);
                      }}
                      className="w-32 px-2 py-1 border border-gray-300 rounded-lg text-xs bg-white"
                    >
                      <option value="">Status</option>
                      {Object.values(OrderStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
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
                  <OrderCard key={order.id} order={order} />
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