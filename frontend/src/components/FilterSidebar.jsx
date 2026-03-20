import React from 'react';

const FilterSidebar = ({ filters, setFilters, onReset }) => {
  const categories = ['All', 'Mobile', 'Headphone', 'Laptop', 'TV'];
  const brands = ['All', 'Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'OnePlus', 'boAt'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full md:w-64 bg-white p-5 rounded-xl shadow-sm h-fit sticky top-24 border border-gray-100">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-sm"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={handleChange}
                className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300 accent-pink-600"
              />
              <span className="text-gray-600 text-sm group-hover:text-pink-600 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Brand</h3>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-gray-700"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Price Range</h3>
        <p className="text-xs text-gray-500 mb-2">LKR {filters.minPrice} - LKR {filters.maxPrice}</p>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 p-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>
        <input
          type="range"
          name="maxPrice"
          min="0"
          max="200000"
          step="1000"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-pink-600 text-white font-medium py-2 rounded-md hover:bg-pink-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 text-sm"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
