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
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    console.log(`[DEBUG] Attempting to delete product with ID: ${product._id}`);
    
    try {
      const result = await deleteProductById(product._id);
      console.log(`[DEBUG] Delete Success:`, result);
      
      toast.success(`${product.name} removed successfully!`);
      if (onDelete) {
          onDelete(product._id);
      }
    } catch (error) {
      console.error("[DEBUG] Delete Error Details:", error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete product';
      
      if (errorMessage?.toLowerCase().includes("not found")) {
        toast.info("Product was already removed.");
        if (onDelete) onDelete(product._id);
      } else {
        toast.error(`Delete failed: ${errorMessage}`);
      }
    } finally {
      setDeleting(false);
      setShowConfirm(false);
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
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(true); }}
            disabled={deleting}
            title="Delete product"
            className="w-9 h-9 bg-red-600 border border-red-700 rounded-xl flex items-center justify-center text-white hover:bg-red-800 transition-all shadow-md disabled:opacity-50 group/del animate-in fade-in zoom-in duration-500"
          >
            <Trash2 size={14} className="group-hover/del:scale-110 transition-transform" />
          </button>
        </div>
      )}


      {/* Custom Confirmation Dialog Overlay */}
      {showConfirm && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-1 leading-tight">Remove Product?</h4>
            <p className="text-xs text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex flex-col w-full gap-2">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(); }}
                  disabled={deleting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {deleting ? 'Removing...' : 'Yes, Delete'}
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(false); }}
                  disabled={deleting}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                >
                  Cancel
                </button>
            </div>
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
