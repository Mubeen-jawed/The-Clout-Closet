import { useEffect, useState, useMemo, use } from "react";
import API from "../api";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Bag() {
  const [bag, setBag] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    API.get("users/bag", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setBag(res.data));
  }, []);

  const handleRemove = async (id) => {
    await API.delete(`users/bag/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setBag((prev) => prev.filter((item) => item.listing._id !== id));
  };

  const total = useMemo(
    () =>
      bag.reduce(
        (sum, item) => sum + item.listing.salePrice * item.quantity,
        0
      ),
    [bag]
  );

  if (!bag.length)
    return (
      <p className="p-6 text-center text-gray-500 mt-28">
        Your bag is empty 🛍️
      </p>
    );

  console.log(bag);

  return (
    <div className="max-w-6xl mx-auto mt-28 p-6">
      <h1 className="text-2xl font-bold mb-8">Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bag Items */}
        <div className="lg:col-span-2 space-y-6">
          {bag.map((item) => (
            <div
              key={item.listing._id}
              className="bg-white border rounded-xl shadow-sm p-4"
            >
              {/* Seller Profile */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={item.listing.seller?.image || "/default-avatar.png"}
                  alt={item.listing.seller?.name || "Seller"}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {item.listing.seller?.name || "Unknown Seller"}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{item.listing.seller?.username || "username"}
                  </p>
                </div>
              </div>

              {/* Product Row */}
              <div className="flex gap-4">
                {/* Product Image */}
                <img
                  src={`http://localhost:5000${item.listing.imageUrl[0]}`}
                  alt={item.listing.title}
                  className="w-28 h-28 object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold line-clamp-1">
                      {item.listing.title}
                    </h2>
                    <p className="text-[--color-brand] font-semibold mt-1">
                      {item.listing.salePrice} RS
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.listing.size}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.listing._id)}
                    className="flex items-center gap-1 text-red-600 text-sm mt-2 hover:underline"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Items ({bag.length})</span>
            <span>{total} RS</span>
          </div>

          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>{total} RS</span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Shipping calculated at checkout
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900"
          >
            Checkout {bag.length} {bag.length === 1 ? "item" : "items"}
          </button>
        </div>
      </div>
    </div>
  );
}
