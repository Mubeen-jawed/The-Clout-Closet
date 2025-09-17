import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [listing, setListing] = useState(null);

  // console.log(Object.create(user));

  // Save shipping info to user
  const handleSave = async () => {
    try {
      await API.put(
        "/users/profile",
        { shipping: form },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Shipping info saved ✅");
    } catch (err) {
      alert("Failed to save shipping info ❌");
    }
  };

  // useEffect(() => {
  //   API.get(`/listings/${id}`).then((res) => {
  //     setListing(res.data);
  //   });
  // }, [id]);

  // Place order
  const handlePlaceOrder = async () => {
    if (placing) return;
    setPlacing(true);

    console.log(localStorage.getItem("token"));

    try {
      await API.post(
        "/orders",
        { paymentMethod }, // ✅ send payment only
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Order placed successfully 🎉");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Shipping Info */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border p-3 rounded"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="flex-1 border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            className="flex-1 border p-3 rounded"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleSave}
          className="w-full bg-gray-100 text-black py-2 rounded-md font-medium hover:bg-gray-200"
        >
          Save Shipping Info
        </button>
      </div>

      {/* Payment Options */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        disabled={placing}
        className={`w-full py-3 rounded-md font-semibold ${
          placing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-900"
        }`}
      >
        {placing ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
