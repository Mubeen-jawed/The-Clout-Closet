import { useEffect, useState } from "react";
import API from "../api";
import ListingCard from "../components/ListingCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    API.get("/users/profile").then((res) => setUser(res.data));
    API.get("/listings").then((res) => {
      const myListings = res.data.filter(
        (l) => l.seller._id === JSON.parse(localStorage.getItem("user"))._id
      );
      setListings(myListings);
    });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Hello, {user.name}</h2>
      <h3 className="text-lg mb-2">Your Listings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((l) => <ListingCard key={l._id} listing={l} />)
        ) : (
          <p>No listings yet.</p>
        )}
      </div>
    </div>
  );
}
