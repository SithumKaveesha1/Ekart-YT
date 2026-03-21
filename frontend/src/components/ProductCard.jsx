import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingCart, Trash2, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { deleteProductById } from '../lib/api';

const ProductCard = ({ product, onDelete }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const isAdmin = user?.role === 'admin';
  const [deleting, setDeleting] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeleting(true);
    try {
      await deleteProductById(product._id);
      toast.success(`${product.name} removed!`);
      if (onDelete) onDelete(product._id);
    } catch (error) {
      console.error("Delete Error:", error);
      
      // If product is already gone from DB, treat it as a success for the UI
      if (error.message?.includes("not found")) {
        toast.info("Product was already removed.");
        if (onDelete) onDelete(product._id);
      } else {
        toast.error(error.message || 'Failed to delete product');
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group h-full relative">
      
      {/* Admin Actions - only visible to admin */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Link
            to={`/admin/edit-product/${product._id}`}
            title="Edit product"
            className="w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-pink-600 hover:border-pink-100 transition-all shadow-md group/edit animate-in fade-in zoom-in duration-300"
          >
            <Pencil size={14} className="group-hover/edit:rotate-12 transition-transform" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete product"
            className="w-9 h-9 bg-red-600 border border-red-700 rounded-xl flex items-center justify-center text-white hover:bg-red-800 transition-all shadow-md disabled:opacity-50 group/del animate-in fade-in zoom-in duration-500"
          >
            <Trash2 size={14} className="group-hover/del:scale-110 transition-transform" />
          </button>
        </div>
      )}


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
