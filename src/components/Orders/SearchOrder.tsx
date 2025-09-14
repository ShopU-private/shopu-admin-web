import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { OrderListResponse } from '../../types/order';
import OrderCard from './OrderCard';

const SearchOrder: React.FC = () => {
  const { fetchWithAuth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<OrderListResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    if (value.trim() === '') {
      setOrders([]);
      return;
    }
    if(value.trim().length < 12 || value.trim().length > 20) {
        return
    }
    setTypingTimeout(
      setTimeout(async () => {
        setLoading(true);
        try {
          const res = await fetchWithAuth(`/api/v1/order/search/${value}`, { method: 'GET' });
        setOrders(Array.isArray(res?.data) ? res.data : []);
        } catch (err) {
            console.log("Error searching order", err);
          setOrders([]);
        } finally {
          setLoading(false);
        }
      }, 500)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Search Orders</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order by ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Searching...</div>
          ) : searchTerm.trim() !== '' && (searchTerm.length < 12 || searchTerm.length > 20) ?(
          <div className="p-6 text-center text-red-500">No valid Id, Please enter valid</div>
          ) : orders.length === 0 && searchTerm.trim() !== '' ? (
            <div className="p-6 text-center text-gray-500">No order found.</div>
          ) : orders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Type to search for an order.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order}/>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;
