import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

const PAGE_SIZE = 20;

const SearchProduct: React.FC = () => {
  const { fetchWithAuth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (search: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/v1/products/search/${pageNum}/${PAGE_SIZE}`,
         { method: 'GET' ,
          queryParams: {
            'query': search
          }
         });
         console.log(res?.data?.content);
      setProducts(res?.data?.content || []);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (err) {
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(0);
    if (typingTimeout) clearTimeout(typingTimeout);
    if (value.trim() === '') {
      setProducts([]);
      setTotalPages(1);
      return;
    }
    setTypingTimeout(
      setTimeout(() => {
        fetchProducts(value, 0);
      }, 500)
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchProducts(searchTerm, newPage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Search Products</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Searching...</div>
          ) : products.length === 0 && searchTerm.trim() !== '' ? (
            <div className="p-6 text-center text-gray-500">No product found.</div>
          ) : products.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Type to search for a product.</div>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <ProductCard product={product}/>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end items-center gap-2 p-4">
                <button
                  onClick={() => handlePageChange(Math.max(0, page - 1))}
                  disabled={page < 1}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                  Prev
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page + 1 === totalPages || products.length === 0}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
