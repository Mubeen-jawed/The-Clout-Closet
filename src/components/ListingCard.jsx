import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <img
        src={`http://localhost:5000${listing.imageUrl?.[0]}`}
        alt={listing.title}
        className="rounded-md w-full h-48 object-cover"
      />
      <h2 className="text-lg font-bold mt-2">{listing.title}</h2>
      <p className="text-gray-500 text-sm">{listing.size}</p>
      <div className="flex items-center mt-1">
        <p className="line-through text-gray-400 font-medium mr-2">
          {listing.originalPrice} RS
        </p>
        <p className="font-semibold text-blue-600">{listing.salePrice} RS</p>
      </div>
      <Link
        to={`/listing/${listing._id}`}
        className="block mt-2 text-center bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  );
}
