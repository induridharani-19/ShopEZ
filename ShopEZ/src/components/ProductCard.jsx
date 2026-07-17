import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";


function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const currentPrice = Math.round(product.price * 95);
  const oldPrice = Math.round(currentPrice * 1.3);

  const rating =
    product.rating?.rate || (Math.random() * 2 + 3).toFixed(1);

  const reviews =
    product.rating?.count ||
    Math.floor(Math.random() * 300 + 50);

  // Add product to wishlist
  const addToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      toast.info("❤️ Product already in Wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    toast.success("❤️ Added to Wishlist");
  };

  // Add product to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    toast.success("🛒 Product Added to Cart");
  };

  // Buy Now
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    navigate("/checkout");
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)",
        transition: "0.3s",
        position: "relative",
      }}
    >
      {/* Wishlist Button */}
      <button
        onClick={addToWishlist}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "none",
          background: "#fff",
          cursor: "pointer",
          fontSize: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,.2)",
          zIndex: 10,
        }}
      >
        ❤️
      </button>

      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "100%",
            height: "240px",
            objectFit: "contain",
            padding: "20px",
            background: "#fafafa",
          }}
        />

        <div style={{ padding: "15px" }}>
          <h3
            style={{
              height: "50px",
              overflow: "hidden",
              fontSize: "17px",
            }}
          >
            {product.title}
          </h3>

          <p
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            ⭐ {rating} ({reviews} Reviews)
          </p>

          <h2
            style={{
              margin: "5px 0",
            }}
          >
            ₹{currentPrice.toLocaleString("en-IN")}
          </h2>

          <p
            style={{
              textDecoration: "line-through",
              color: "#777",
              margin: "0",
            }}
          >
            ₹{oldPrice.toLocaleString("en-IN")}
          </p>

          <p
            style={{
              color: "green",
              fontWeight: "bold",
              marginTop: "8px",
            }}
          >
            30% OFF • Free Delivery
          </p>
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "15px",
        }}
      >
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: "12px",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          style={{
            flex: 1,
            padding: "12px",
            background: "#2874f0",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;