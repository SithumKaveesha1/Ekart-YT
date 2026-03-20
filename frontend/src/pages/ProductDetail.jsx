import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { ChevronLeft, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8000/api/products/${id}`);
                if (res.data.success) {
                    setProduct(res.data.product);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        
        // Dispatch the same product object but override quantity if needed
        // The reducer handles adding 1 by default, but we can pass quantity if we update the slice
        // For now, let's just stick to the existing slice behavior: add 1
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 flex justify-center">
                <div className="animate-pulse flex flex-col md:flex-row gap-12 max-w-7xl w-full px-6">
                    <div className="w-full md:w-1/2 h-[500px] bg-gray-200 rounded-3xl"></div>
                    <div className="flex-1 space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
                <Link to="/products" className="text-pink-600 hover:underline mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Back Navigation */}
                <Link to="/products" className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Catalog</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Left: Image Section */}
                    <div className="relative aspect-square bg-[#f8f9fa] rounded-[2.5rem] overflow-hidden group border border-gray-100 shadow-sm">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Right: Product Info Section */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                             <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {product.brand}
                             </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex bg-yellow-50 px-2 py-1 rounded-lg">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill={i < 4 ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth={1} />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm font-medium">4.8 (120+ reviews)</span>
                        </div>

                        <div className="bg-pink-50 p-6 rounded-3xl border border-pink-100 mb-8 inline-block self-start">
                            <span className="text-pink-600 text-sm font-bold block mb-1">Current Price</span>
                            <span className="text-4xl font-black text-gray-900">
                                LKR {product.price.toLocaleString()}
                            </span>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
                            {product.description || "Experience next-level performance and elegant design with the all-new " + product.name + ". Engineered for those who demand excellence in every detail."}
                        </p>

                        {/* Features / Icons */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                <ShieldCheck className="text-pink-600" size={24} />
                                <span className="text-sm font-semibold tracking-tight">1 Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-2xl">
                                <Truck className="text-pink-600" size={24} />
                                <span className="text-sm font-semibold tracking-tight">Free Delivery</span>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            <Button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white h-16 rounded-2xl text-lg font-bold shadow-lg shadow-pink-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                            >
                                <ShoppingCart size={22} />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
