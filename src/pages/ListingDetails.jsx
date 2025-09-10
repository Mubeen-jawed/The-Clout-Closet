import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    API.get(`/listings/${id}`).then((res) => setListing(res.data));
  }, [id]);

  const handleBuy = async () => {
    await API.post("/orders", { listingId: listing._id });
    alert("Order placed successfully!");
    navigate("/");
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex gap-2 overflow-x-auto">
        {listing.imageUrl?.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000${img}`}
            alt={`${listing.title}-${index}`}
            className="rounded w-48 h-48 object-cover flex-shrink-0"
          />
        ))}
      </div>
      <h1 className="text-2xl font-bold mt-4">{listing.title}</h1>
      <p className="text-gray-600">{listing.description}</p>
      <p className="text-gray-500 text-sm">Size: {listing.size}</p>
      <p className="text-xl font-semibold text-blue-600 mt-2">
        ${listing.price}
      </p>
      {/* <button
        onClick={() => setChatOpen(!chatOpen)}
        className="w-full bg-blue-500 text-white mt-2 py-2 rounded"
      >
        Chat with Seller
      </button> */}

      <Link
        to="/messages"
        state={{
          listingId: listing._id,
          otherUser: listing.seller,
        }}
        className=" bg-blue-500 text-white mt-2 py-2 rounded"
      >
        Chat With Seller
      </Link>

      {/* {chatOpen && (
        <ChatBox listingId={listing._id} otherUser={listing.seller} />
      )} */}
      <button
        onClick={handleBuy}
        className="w-full bg-green-600 text-white mt-4 py-2 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  );
}
