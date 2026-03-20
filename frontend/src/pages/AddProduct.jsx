import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Package, DollarSign, Image as ImageIcon, Tag, Briefcase, Plus, ArrowLeft, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { createProduct } from '../lib/api';

const AddProduct = () => {
    const { user } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'Mobile',
        brand: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect non-admin users
    useEffect(() => {
        if (user !== undefined && user?.role !== 'admin') {
            toast.error('Access denied. Admin only.');
            navigate('/');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await createProduct(formData);
            if (data.success) {
                toast.success("Product added successfully!");
                navigate('/products');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gray-50/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold text-sm transition-colors mb-2"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Add New <span className="text-pink-600">Product</span></h1>
                    </div>
                    <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 shadow-lg shadow-pink-50">
                        <Plus size={28} strokeWidth={3} />
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                        
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                                <Info size={18} className="text-pink-600" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Package size={14} className="text-pink-500" />
                                        Product Name
                                    </Label>
                                    <Input 
                                        id="name"
                                        placeholder="e.g. iPhone 15 Pro Max"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-xl border-gray-100 focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-bold text-gray-700">
                                        Description (Optional)
                                    </Label>
                                    <textarea 
                                        id="description"
                                        placeholder="Detailed description of the product..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full min-h-[100px] p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-gray-700 placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <DollarSign size={14} className="text-pink-500" />
                                        Price (LKR)
                                    </Label>
                                    <Input 
                                        id="price"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-xl border-gray-100"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="brand" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Briefcase size={14} className="text-pink-500" />
                                        Brand
                                    </Label>
                                    <Input 
                                        id="brand"
                                        placeholder="e.g. Apple, Samsung"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-xl border-gray-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Categorization & Media */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                                <Tag size={18} className="text-pink-600" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Categorization & Media</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-bold text-gray-700">Category</Label>
                                    <select 
                                        id="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm font-medium text-gray-700"
                                    >
                                        <option value="Mobile">Mobile</option>
                                        <option value="Headphone">Headphone</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="TV">TV</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <ImageIcon size={14} className="text-pink-500" />
                                        Image URL
                                    </Label>
                                    <Input 
                                        id="image"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                        className="h-12 rounded-xl border-gray-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 flex gap-4">
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="flex-1 h-14 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-pink-100 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Adding Product..." : "Create Product"}
                            </Button>
                            <Button 
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="h-14 px-8 border-gray-100 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        Admin Inventory System Active
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
