import { useState } from "react";
import { categories } from "../data/categories"; // predefined
import { brands } from "../data/brands"; // predefined
import { fabrics } from "../data/fabrics"; // from your array
import { sizes } from "../data/sizes"; // from your array

export default function FilterSidebar({ onApply }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const toggleSelection = (item, state, setState) => {
    setState((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const discounts = ["30%+", "40%+", "50%+", "60%+", "70%+"];

  const applyFilters = () => {
    onApply({
      categories: selectedCategories,
      brands: selectedBrands,
      sizes: selectedSizes,
      fabrics: selectedFabrics,
      discounts: selectedDiscounts,
      price: { min: priceMin, max: priceMax },
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedDiscounts([]);
    setPriceMin("");
    setPriceMax("");

    // Optionally reload all listings (no filters)
    onApply({});
  };

  return (
    <div className="w-64 bg-white border-r p-4 space-y-4 pt-20">
      <h3 className="text-lg font-bold mb-2">Filter by</h3>

      {/* Category */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Category</summary>
        {categories.map((cat) => (
          <label key={cat} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleSelection(cat, selectedCategories, setSelectedCategories)
              }
            />{" "}
            {cat}
          </label>
        ))}
      </details>

      {/* Brand */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Brand</summary>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() =>
                toggleSelection(brand, selectedBrands, setSelectedBrands)
              }
            />{" "}
            {brand}
          </label>
        ))}
      </details>

      {/* Price */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Price</summary>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            className="border p-1 w-20 rounded"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="border p-1 w-20 rounded"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
        {/* Range bar (just visual) */}
        <input type="range" min="0" max="10000" className="w-full mt-2" />
      </details>

      {/* Size */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Size</summary>
        {sizes.map((size) => (
          <label key={size} className="block">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() =>
                toggleSelection(size, selectedSizes, setSelectedSizes)
              }
            />{" "}
            {size}
          </label>
        ))}
      </details>

      {/* Fabric */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Fabric</summary>
        {fabrics.map((fabric) => (
          <label key={fabric} className="block">
            <input
              type="checkbox"
              checked={selectedFabrics.includes(fabric)}
              onChange={() =>
                toggleSelection(fabric, selectedFabrics, setSelectedFabrics)
              }
            />{" "}
            {fabric}
          </label>
        ))}
      </details>

      {/* Discount */}
      <details>
        <summary className="cursor-pointer font-medium mb-1">Discount</summary>
        {discounts.map((disc) => (
          <label key={disc} className="block">
            <input
              type="checkbox"
              checked={selectedDiscounts.includes(disc)}
              onChange={() =>
                toggleSelection(disc, selectedDiscounts, setSelectedDiscounts)
              }
            />{" "}
            {disc}
          </label>
        ))}
      </details>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
      <button
        onClick={clearFilters}
        className="mt-1 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
      >
        Clear Filters
      </button>
    </div>
  );
}
