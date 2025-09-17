import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import API from "../api";

export default function Favorites() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/favorites")
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch favorites:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!favorites.length) {
    return (
      <div className="p-6 text-center text-gray-500">No favorites yet 💔</div>
    );
  }

  console.log(favorites);

  return (
    <div className="mt-40 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favorites.map((product) => (
        <ListingCard
          key={product._id}
          listing={product}
          favoriteIds={favorites.map((f) => f._id)}
        />
      ))}
    </div>
  );
}
