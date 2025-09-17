import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function SearchPopup({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      API.get(`/listings/search/${query}`).then((res) => setResults(res.data));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-3/4 md:w-1/2 rounded-lg shadow-lg p-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full border p-2 rounded mb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Results */}
        <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
          {results.map((listing) => {
            const firstImage = Array.isArray(listing.imageUrl)
              ? listing.imageUrl[0]
              : listing.imageUrl;

return (
    <div className="absolute left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
      {filtered.length === 0 && (
        <p className="p-3 text-sm text-neutral-500">No results found</p>
      )}
      {filtered.map((i) => (
        <div
          key={i.id}
          className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
        >
          {i.title}
        </div>
      ))}
    </div>
  )  
  
  })}
        </div>
      </div>
    </div>
  );
}
