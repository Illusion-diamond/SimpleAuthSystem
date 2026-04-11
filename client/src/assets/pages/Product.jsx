import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    Name: "",
    order_id: "",
  });
  const [editId, setEditId] = useState(null);

  // 🔵 Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🟢 Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(`${API}/register`, form);
    }

    setForm({ product_id: "", Name: "", order_id: "" });
    fetchProducts();
  };

  // 🔴 Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };

  // ✏️ Edit
  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Product Management System
      </h1>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Product ID"
            value={form.product_id}
            onChange={(e) =>
              setForm({ ...form, product_id: e.target.value })
            }
          />

          <input
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Product Name"
            value={form.Name}
            onChange={(e) =>
              setForm({ ...form, Name: e.target.value })
            }
          />

          <input
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Order ID"
            value={form.order_id}
            onChange={(e) =>
              setForm({ ...form, order_id: e.target.value })
            }
          />

          <button
            type="submit"
            className={`col-span-1 md:col-span-3 py-2 rounded-lg text-white font-semibold ${
              editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="max-w-5xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                {p.Name}
              </h3>

              <p className="text-gray-600">
                <span className="font-semibold">Product ID:</span> {p.product_id}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Order ID:</span> {p.order_id}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-green-500 text-white py-1 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Product;