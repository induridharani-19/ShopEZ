import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: Date.now(),
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
    stock: "",
    brand: "",
    rating: {
      rate: 4.5,
      count: 100,
    },
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      });

      alert("✅ Product Added Successfully");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Unable to add product");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Product Name"
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
          style={input}
        />

        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          style={input}
        />

        <input
          name="stock"
          placeholder="Stock"
          type="number"
          onChange={handleChange}
          style={input}
        />

        <input
          name="thumbnail"
          placeholder="Image URL"
          onChange={handleChange}
          required
          style={input}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          onChange={handleChange}
          required
          style={input}
        />

        <button
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Product
        </button>

      </form>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

export default AddProduct;