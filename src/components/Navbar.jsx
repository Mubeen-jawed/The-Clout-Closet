import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import { FaSearch } from "react-icons/fa";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import SearchPopup from "./SearchPop";

export default function Navbar() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState(false)

  const fetchUnread = () => {
    if (token) {
      API.get("/chat/unread/count")
        .then((res) => setUnreadCount(res.data.count))
        .catch(() => setUnreadCount(0));
    }
  };

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const handleSearch = (e) => {
    setSearch(true)
    setQ(e.target.value)
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center gap-4">
          {/* Left: brand */}
          <Link
            to="/"
            className="shrink-0 text-[28px] leading-none font-extrabold tracking-tight text-red-600"
            aria-label="Thrifty home"
            style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system" }}
          >
            Thrifty
          </Link>

          {/* Middle: large rounded search */}
          <form
            onSubmit={submitSearch}
            className="flex-1 hidden sm:flex items-center"
          >
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                value={q}
                onChange={(e) => handleSearch(e)}
                type="search"
                placeholder="Search for"
                className="w-full h-12 pl-11 pr-4 rounded-full bg-neutral-100/90 focus:bg-white border border-neutral-300 focus:border-neutral-400 outline-none text-[18px] placeholder:text-neutral-400"
              />
            </div>
            {search && <SearchPopup/>}
          </form>

          {/* Right: icons + actions */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/favorites"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-neutral-100"
              title="Favorites"
            >
              <FiHeart className="text-neutral-700 text-xl" />
            </Link>

            <Link
              to="/bag"
              className="hidden sm:inline-flex relative p-2 rounded-full hover:bg-neutral-100"
              title="Bag"
            >
              <FiShoppingBag className="text-neutral-700 text-xl" />
            </Link>

            {/* Primary action */}
            <Link
              to={token ? "/create" : "/login"}
              className="inline-flex h-10 items-center rounded-md bg-neutral-900 px-5 text-white font-semibold hover:bg-black transition"
            >
              Sell now
            </Link>

            {/* Auth section */}
            {!token ? (
              <>
                <Link
                  to="/register"
                  className="inline-flex h-10 items-center rounded-md border border-neutral-800 px-5 font-semibold hover:bg-neutral-50"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center px-3 font-semibold text-neutral-800 hover:underline"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="hidden sm:inline-flex h-10 items-center px-3 font-semibold text-neutral-800 hover:underline"
                >
                  Profile
                </Link>
                <Link to="/messages" className="relative inline-flex h-10 items-center px-3">
                  <span className="font-semibold">Messages</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[11px] leading-none px-1.5 py-1">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={logout}
                  className="inline-flex h-10 items-center px-3 font-semibold text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile search row */}
        <div className="sm:hidden pb-3">
          <form onSubmit={submitSearch}>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="search"
                placeholder="Search for"
                className="w-full h-11 pl-11 pr-4 rounded-full bg-neutral-100 border border-neutral-300 placeholder:text-neutral-400"
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
