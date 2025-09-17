// src/components/CategoryNavbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = {
  women: {
    byCategory: [
      "Tops",
      "Jeans",
      "Sweaters",
      "Skirts",
      "Dresses",
      "Coats & Jackets",
      "Shoes",
      "Bags & Purses",
      "Sunglasses",
      "Hats",
      "Jewelry",
      "Plus Size",
    ],
    featured: [
      "Wardrobe essentials",
      "Denim everything",
      "Lifestyle sneakers",
      "Office wear",
      "Gym gear",
    ],
  },
  men: {
    byCategory: [
      "T-shirts",
      "Shirts",
      "Hoodies",
      "Jeans",
      "Sweaters",
      "Coats & Jackets",
      "Shoes",
      "Bags",
      "Hats",
      "Jewelry",
      "Sunglasses",
      "Big & Tall",
    ],
    featured: [
      "Wardrobe essentials",
      "Denim everything",
      "Lifestyle sneakers",
      "Office wear",
      "Gym gear",
    ],
  },
  kids: {
    byCategory: ["Tops", "Bottoms", "Dresses", "Jackets", "Shoes", "Bundles"],
    popularBrands: [
      "Carhartt",
      "Carter's",
      "Gap",
      "Nike",
      "OshKosh B’gosh",
      "Vans",
    ],
    byGender: ["Boy", "Girl", "Unisex"],
    byAge: [
      "Baby (0-12m)",
      "Toddler (1-3 years)",
      "Child (4-12 years)",
      "Teen (13-16 years)",
    ],
  },
  influencers: {
    byCategory: ["Top Picks", "Trending Styles", "Collabs", "Exclusive Drops"],
    featured: ["Curated Looks", "Sneaker Picks", "Streetwear Icons"],
  },
};

export default function CategoryNavbar() {
  const [active, setActive] = useState(null);

  return (
    <nav
      // onMouseEnter={() => setActive(cat)}
      onMouseLeave={() => setActive(null)}
      className="border-t border-neutral-200 relative"
    >
      {/* Top level links */}
      <ul className="flex justify-center gap-8 py-3 font-semibold">
        {Object.keys(categories).map((cat) => (
          <li
            key={cat}
            className="cursor-pointer  capitalize"
            onMouseEnter={() => setActive(cat)}
          >
            {cat}
            {active === cat && (
              <div className="absolute left-0 top-full w-full bg-white/95 backdrop-blur shadow-lg z-20 p-6 grid grid-cols-4 gap-6">
                {/* Women / Men */}
                {(cat === "women" || cat === "men") && (
                  <>
                    <div>
                      <h3 className="font-bold mb-2">Shop by category</h3>
                      <ul className="space-y-1">
                        {categories[cat].byCategory.map((sub) => (
                          <li className="" key={sub}>
                            <Link
                              to={`/category/${cat}/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline "
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Featured</h3>
                      <ul className="space-y-1">
                        {categories[cat].featured.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/${cat}/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Kids */}
                {cat === "kids" && (
                  <>
                    <div>
                      <h3 className="font-bold mb-2">Shop by category</h3>
                      <ul className="space-y-1">
                        {categories.kids.byCategory.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/kids/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Popular brands</h3>
                      <ul className="space-y-1">
                        {categories.kids.popularBrands.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/kids/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Shop by gender</h3>
                      <ul className="space-y-1">
                        {categories.kids.byGender.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/kids/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Shop by age</h3>
                      <ul className="space-y-1">
                        {categories.kids.byAge.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/kids/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {/* Influencers */}
                {cat === "influencers" && (
                  <>
                    <div>
                      <h3 className="font-bold mb-2">Shop by category</h3>
                      <ul className="space-y-1">
                        {categories.influencers.byCategory.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/influencers/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Featured</h3>
                      <ul className="space-y-1">
                        {categories.influencers.featured.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={`/category/influencers/${sub
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="hover:underline"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
