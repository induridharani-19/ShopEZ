import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await API.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Unable to delete product");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>📦 Products Management</h1>

        <Link to="/admin/products/add">
          <button
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            + Add Product
          </button>
        </Link>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={td}>
                <img
                  src={product.thumbnail || product.image}
                  alt={product.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td style={td}>{product.title}</td>

              <td style={td}>{product.category}</td>

              <td style={td}>₹{product.price}</td>

              <td style={td}>
                <Link to={`/admin/products/edit/${product.id}`}>
                  <button
                    style={{
                      marginRight: "10px",
                      background: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};

export default Products;