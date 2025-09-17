import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import ListingCard from "../components/ListingCard"; // reuse your card

export default function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);

  console.log(id);

  useEffect(() => {
    API.get(`/listings/${id}`).then((res) => {
      setListing(res.data);

      // fetch similar products by category
      API.get(`/listings?category=${res.data.category}`).then((res2) =>
        setSimilar(res2.data.filter((item) => item._id !== res.data._id))
      );
    });
  }, [id]);

  const handleBuy = async () => {
    // await API.post("/orders", { listingId: listing._id });
    // alert("Order placed successfully!");
    await API.post(
      `users/bag/${listing._id}`,
      { quantity: 1 },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    navigate("/checkout");
  };

  const handleAddToBag = async () => {
    await API.post(
      `users/bag/${listing._id}`,
      { quantity: 1 },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    alert("Added to your bag!");
  };

  if (!listing) return <p className="text-center mt-40">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-40 px-6">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          {listing.imageUrl?.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img}`}
              alt={`${listing.title}-${index}`}
              className="rounded-lg w-full object-cover"
            />
          ))}
        </div>

        {/* Right: Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <p className="text-xl font-bold text-[--color-brand]">
            {listing.salePrice} RS
          </p>

          <p className="text-gray-600">Size: {listing.size}</p>
          {listing.condition && (
            <p className="text-gray-500 text-sm">
              Condition: {listing.condition}
            </p>
          )}
          {listing.brand && (
            <p className="text-gray-500 text-sm">
              Brand:{" "}
              <Link to={`/brand/${listing.brand}`} className="underline">
                {listing.brand}
              </Link>
            </p>
          )}

          {/* Buttons */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleBuy}
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToBag}
              className="w-full border border-black py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Add to Bag
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>✔ All purchases are covered by Buyer Protection</p>
            <p>
              🚚 This seller often ships in <strong>24 hours</strong>
            </p>
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">You might also like</h2>
        {similar.length === 0 ? (
          <p className="text-gray-500">No similar products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((item) => (
              <ListingCard key={item._id} listing={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
