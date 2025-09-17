// src/components/ListingCard.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ListingCard({
  listing,
  favoriteIds = [],
  onToggleFavorite,
}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [favorites, setFavorites] = useState([]);

  // ✅ Check if liked (works with both objects & IDs)
  const isFav =
    favorites?.some((item) => item._id === listing._id) ||
    favoriteIds?.includes(listing._id);

  // ✅ Toggle like/unlike
  const toggleFavorite = async (e) => {
    e.preventDefault();

    let updated;

    if (isFav) {
      // remove
      updated = favorites.filter(
        (item) => item._id !== listing._id && item !== listing._id
      );
    } else {
      // add
      updated = [...favorites, listing];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    // backend sync
    const method = isFav ? "DELETE" : "POST";

    try {
      await fetch(`${API_URL}/api/users/favorites/${listing._id}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // optional parent update
      if (onToggleFavorite) onToggleFavorite(listing._id, !isFav);
    } catch (err) {
      console.error("Failed to update favorite:", err);
    }
  };

  // ✅ Load favorites from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  return (
    <Link
      to={`/listing/${listing._id}`}
      className="block bg-white rounded-lg hover:shadow-md transition"
    >
      {/* Listing Image */}
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          src={`${API_URL}${listing.imageUrl}`}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform rounded-md"
        />

        {/* Heart Icon */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 hover:scale-110 transition"
        >
          {isFav ? (
            <FaHeart className="text-black" /> // 👈 Black heart when liked
          ) : (
            <FaRegHeart className="text-[--color-secondary]" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Influencer / Seller profile */}
        <div className="flex items-center gap-2">
          <img
            src={listing.seller?.image || "/default-avatar.png"}
            alt={listing.seller?.name || "Seller"}
            className="w-7 h-7 rounded-full border border-[--color-secondary]"
          />
          <span className="font-medium text-[--color-secondary] text-sm">
            {listing.seller?.name}
          </span>
        </div>

        {/* Listing size */}
        <p className="text-sm text-gray-600">{listing.size}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          {listing.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {listing.originalPrice} RS
            </span>
          )}
          <p className="font-semibold text-[--color-brand]">
            {listing.salePrice} RS
          </p>
        </div>
      </div>
    </Link>
  );
}
