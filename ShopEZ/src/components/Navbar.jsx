import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    window.dispatchEvent(
      new CustomEvent("search", {
        detail: e.target.value,
      })
    );
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        🛍 ShopEZ
      </Link>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products, brands and more..."
          className="search-box"
          onChange={handleSearch}
        />
      </div>

      {/* Navigation */}
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>

        <Link to="/products">📦 Products</Link>

        <Link to="/wishlist">❤️ Wishlist</Link>

        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-badge">{cartCount}</span>
        </Link>

        {user ? (
          <>
            {user.isAdmin && (
              <Link to="/admin" style={{ color: "#34d399", fontWeight: "bold" }}>
                📊 Admin
              </Link>
            )}
            <Link to="/profile">👤 {user.name}</Link>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "5px 10px",
                display: "inline-flex",
                alignItems: "center",
                transition: "color 0.3s"
              }}
              onMouseOver={(e) => (e.target.style.color = "#ffe082")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <Link to="/login">👤 Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;