import React from 'react';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative p-4 bg-gray-50 flex justify-center items-center h-48 overflow-hidden">
          <img
            src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}
            alt={product.name}
            className="object-contain max-h-full transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">{product.brand}</div>
        <Link to={`/product/${product._id}`} className="hover:text-pink-600 transition-colors">
          <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 leading-tight flex-grow">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="font-bold text-lg text-gray-900 mb-3">
            LKR {product.price.toLocaleString('en-LK')}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-600 text-white py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 hover:bg-pink-700 active:scale-95 transition-all shadow-sm hover:shadow-pink-500/30"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
