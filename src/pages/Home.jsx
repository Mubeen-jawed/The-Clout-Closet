import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import slugify from "slugify";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const toSlug = (name) => slugify(name, { lower: true, strict: true });

  // Initial listings load
  useEffect(() => {
    API.get("/listings").then((res) => {
      setListings(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    API.get("/users/favorites").then((res) => {
      setFavorites(res.data);
    });
  }, []);
  // Handle Apply Filters
  // const handleApplyFilters = (filters) => {
  //   setLoading(true);
  //   API.post("/listings/filter", filters).then((res) => {
  //     setListings(res.data);
  //     setLoading(false);
  //   });
  // };

  return (
    <div className="flex">
      {/* Filter Sidebar */}
      {/* <FilterSidebar onApply={handleApplyFilters} /> */}

      {/* Main Content */}
      <div className="flex-1 p-6 mt-28">
        {/* Categories */}
        {/* <div className="">
          <h2 className="text-xl font-bold mb-4 flex justify-between">
            Categories
            <Link
              to="/categories"
              className="text-sm text-blue-600 hover:underline"
            >
              See More
            </Link>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, index) => (
              <Link
                to={`/category/${toSlug(cat)}`}
                key={index}
                className="p-4 border rounded-lg text-center hover:bg-gray-100"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div> */}

        {/* Listings */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            <Loader />
          ) : (
            listings.map((l) => (
              <ListingCard
                key={l._id}
                listing={l}
                favoriteIds={favorites.map((f) => f._id)}
              />
            ))
          )}
        </div>

        {/* Brands */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex justify-between mt-10">
            Brands
            <Link
              to="/brands"
              className="text-sm text-blue-600 hover:underline"
            >
              See More
            </Link>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brands.slice(0, 8).map((brand, index) => (
              <Link
                to={`/brand/${toSlug(brand)}`}
                key={index}
                className="p-4 border rounded-lg text-center hover:bg-gray-100"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
