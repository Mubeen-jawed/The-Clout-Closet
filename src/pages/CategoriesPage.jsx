// src/pages/CategoriesPage.jsx
import { Link } from "react-router-dom";
import slugify from "slugify";
import { categories } from "../data/categories";

const toSlug = (name) => slugify(name, { lower: true, strict: true });

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {categories.map((cat, index) => (
          <Link
            to={`/category/${toSlug(cat)}`}
            key={index}
            className="p-4 border rounded-lg text-center hover:bg-gray-100"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
