import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load product");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, product);

      toast.success("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h2>Edit Product</h2>

      <form
        onSubmit={updateProduct}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={product.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Image URL"
          value={product.thumbnail}
          onChange={handleChange}
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;