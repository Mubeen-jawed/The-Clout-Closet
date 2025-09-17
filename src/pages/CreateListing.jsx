import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { categories } from "../data/categories";
import { brands } from "../data/brands";
import { fabrics } from "../data/fabrics";
import { sizes } from "../data/sizes";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [fabric, setFabric] = useState("");
  const [size, setSize] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [salePercentage, setSalePercentage] = useState(0);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  // Auto-calculate sale percentage
  useEffect(() => {
    if (originalPrice && salePrice) {
      const discount = ((originalPrice - salePrice) / originalPrice) * 100;
      setSalePercentage(Math.round(discount));
    }
  }, [originalPrice, salePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("condition", condition);
    formData.append("fabric", fabric);
    formData.append("size", size);
    formData.append("originalPrice", originalPrice);
    formData.append("salePrice", salePrice);
    formData.append("salePercentage", salePercentage);
    image.forEach((file) => {
      formData.append("images", file);
    });
    await API.post("/listings", formData);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-28">
      <h2 className="text-xl font-bold mb-4">Create Listing</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded"
          placeholder="Brand (If known)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <select
          className="border p-2 rounded"
          value={fabric}
          onChange={(e) => setFabric(e.target.value)}
        >
          <option value="">Select Fabric</option>
          {fabrics.map((fab, i) => (
            <option key={i} value={fab}>
              {fab}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select Size</option>
          {sizes.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          onwheel={(e) => e.target.blur()}
          className="border p-2 rounded"
          type="number"
          placeholder="Original Price"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <input
          onwheel="this.blur()"
          className="border p-2 rounded"
          type="number"
          placeholder="Sale Price"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />

        <p className="text-sm text-gray-500">
          Discount: {salePercentage ? `${salePercentage}%` : "0%"}
        </p>

        <div className="flex gap-2 flex-wrap">
          {image.map((file, index) => (
            <div key={index} className="relative w-20 h-20">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover rounded border"
              />
              <button
                type="button"
                onClick={() =>
                  setImage((prev) => prev.filter((_, i) => i !== index))
                }
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <input
          type="file"
          multiple
          onChange={(e) => {
            const newFiles = Array.from(e.target.files);
            setImage((prev) => [...prev, ...newFiles]); // append instead of replace
          }}
        />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
}
