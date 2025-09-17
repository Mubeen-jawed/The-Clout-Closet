import { Link } from "react-router-dom";
import slugify from "slugify";
import { brands } from "../data/brands";

const toSlug = (name) => slugify(name, { lower: true, strict: true });

export default function BrandsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {brands.map((brand, index) => (
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
  );
}
