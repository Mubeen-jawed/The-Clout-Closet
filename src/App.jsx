import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import Messages from "./pages/Messages";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import BrandsPage from "./pages/BrandsPage";
import BrandPage from "./pages/BrandPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />{" "}
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
}
