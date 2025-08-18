import React, { useState } from 'react';

interface OrderCreateProps {
  onBack: () => void;
}

type ProductItem = {
  productId: string;
  quantity: number;
  price: number;
};

const initialProduct: ProductItem = { productId: '', quantity: 1, price: 0 };

const OrderCreate: React.FC<OrderCreateProps> = ({ onBack }) => {
  const [products, setProducts] = useState<ProductItem[]>([ { ...initialProduct } ]);

  const handleAddProduct = () => {
    setProducts((prev) => [...prev, { ...initialProduct }]);
  };

  const handleRemoveProduct = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleProductChange = (idx: number, field: keyof ProductItem, value: string | number) => {
    setProducts((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select customer</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Mike Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Products
            </label>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Add Products</span>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={handleAddProduct}
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-3">
                {products.map((item, idx) => (
                  <div className="grid grid-cols-4 gap-4" key={idx}>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.productId}
                      onChange={e => handleProductChange(idx, 'productId', e.target.value)}
                    >
                      <option value="">Select product</option>
                      <option value="1">Laptop Pro 15"</option>
                      <option value="2">Wireless Headphones</option>
                      <option value="3">Coffee Maker</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.quantity}
                      onChange={e => handleProductChange(idx, 'quantity', Number(e.target.value))}
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={item.price}
                      onChange={e => handleProductChange(idx, 'price', Number(e.target.value))}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveProduct(idx)}
                      disabled={products.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderCreate;
