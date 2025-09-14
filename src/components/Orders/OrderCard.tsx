import React from "react";
import { Eye } from "lucide-react";
import { formatPrice } from "../../utils/formatter";
import { OrderListResponse } from "../../types/order";

interface OrderCardProps {
  order: OrderListResponse;
}

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed'.toUpperCase() : return 'bg-yellow-50 text-orange-500';
      case 'shipped'.toUpperCase(): return 'bg-purple-100 text-purple-800';
      case 'delivered'.toUpperCase(): return 'bg-green-100 text-green-800';
      case 'cancelled'.toUpperCase(): return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

const OrderCard: React.FC<OrderCardProps> = ({ order}) => {
  return (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {order.orderId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.receiverName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.totalItem} item{order.totalItem !== 1 ? "s" : ""}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ₹{formatPrice(order.orderAmount)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
        >
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
        </div>
      </td>
    </tr>
  );
};

export default OrderCard;
