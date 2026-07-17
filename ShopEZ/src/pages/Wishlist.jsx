import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(items);
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
        }}
      >
        <h1>❤️ Wishlist</h1>
        <p>Your wishlist is empty.</p>

        <Link to="/products">
          <button
            style={{
              padding: "12px 25px",
              marginTop: "20px",
              background: "#2874f0",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>❤️ My Wishlist</h1>

      {wishlist.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            background: "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
            }}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>

            <h2>
              ₹{Math.round(item.price * 95).toLocaleString("en-IN")}
            </h2>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;