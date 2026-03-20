import React, { useState, useMemo, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    brand: 'All',
    minPrice: 0,
    maxPrice: 200000,
  });

  const [sortOrder, setSortOrder] = useState('relevant');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/products');
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'All',
      brand: 'All',
      minPrice: 0,
      maxPrice: 200000,
    });
    setSortOrder('relevant');
  };

  const handleProductDelete = (deletedId) => {
    setProducts(prev => prev.filter(p => p._id !== deletedId));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    console.log("Filtering with:", filters);
    const filtered = products.filter((product) => {
      const matchSearch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'All' || product.category === filters.category;
      const matchBrand = filters.brand === 'All' || product.brand === filters.brand;
      const matchPrice = Number(product.price) >= Number(filters.minPrice) && Number(product.price) <= Number(filters.maxPrice);
      
      const isMatch = matchSearch && matchCategory && matchBrand && matchPrice;
      return isMatch;
    });
    return filtered.sort((a, b) => {
        if (sortOrder === 'lowToHigh') return a.price - b.price;
        if (sortOrder === 'highToLow') return b.price - a.price;
        return 0;
    });
  }, [filters, sortOrder, products]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar filters={filters} setFilters={setFilters} onReset={handleReset} />
        </aside>

        {/* Main Content Areas */}
        <main className="flex-1">
          {/* Top Header / Sorting */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Showing Results <span className="text-gray-500 text-sm font-normal">({filteredProducts.length} items)</span>
            </h2>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-600">Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm bg-gray-50 text-gray-700 cursor-pointer"
              >
                <option value="relevant">Relevant</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} onDelete={handleProductDelete} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 mb-4">
                 <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term to find what you're looking for.</p>
              <button 
                onClick={handleReset}
                className="mt-6 px-6 py-2 bg-pink-100 text-pink-700 font-medium rounded-md hover:bg-pink-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
