import React from "react";
import { Product } from "../../types/Product";
import { formatPrice, truncateWords } from "../../utils/formatter";
//import { Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <tr 
    key={product.id}
    onClick={() => navigate("/updateProduct", { state: { product } })}
     className="hover:bg-gray-50"
     >
      <td className="px-6 py-4 whitespac-enowrap">
        <div className="flex items-center">
          {/* Fix: product.image is a string, not a function */}
          {product.images ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">
              {truncateWords(product.description != null ? product.description :"", 5)}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ₹{formatPrice(product.price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : '_ _'}
      </td>
    </tr>
  );
};

export default ProductCard;

{/* <div className="flex items-center space-x-2">
          <button 
          onClick={() => navigate("/updateProduct", { state: { product } })}
          className="text-blue-600 hover:text-blue-800">
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/updateProduct", { state: { product } })}
            className="text-green-600 hover:text-green-800"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="w-4 h-4" />
          </button>
        </div> */}