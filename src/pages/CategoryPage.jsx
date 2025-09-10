// src/pages/CategoryPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function CategoryPage() {
  const { category } = useParams();
  const [listings, setListings] = useState([]);

  // Convert slug back to normal string
  const formattedCategory = category.replace(/-/g, " ");

  useEffect(() => {
    API.get(`/listings/category/${category}`).then((res) =>
      setListings(res.data)
    );
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{formattedCategory}</h1>

      {listings.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border rounded">
          No listings found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((listing) => {
            const firstImage = Array.isArray(listing.imageUrl)
              ? listing.imageUrl[0]
              : listing.imageUrl;

            return (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5000${firstImage}`}
                  alt={listing.title}
                  className="rounded-md w-full h-40 object-cover"
                />
                <h2 className="text-sm font-semibold mt-2 truncate">
                  {listing.title}
                </h2>
                <p className="text-xs text-gray-500">{listing.brand}</p>
                <Link
                  to={`/listing/${listing._id}`}
                  className="block text-center bg-blue-600 text-white py-1 rounded mt-2 hover:bg-blue-700"
                >
                  View
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
