import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const [aiRecommendations, setAiRecommendations] = useState([]);

  useEffect(() => {
    API
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        API
          .get("/products")
          .then((response) => {
            const list = response.data.products || response.data;
            const related = list
              .filter((item) => item.id !== res.data.id)
              .slice(0, 4);

            setRelatedProducts(related);
          })
          .catch((err) => console.log(err));

        // Fetch AI-based recommendations
        API
          .post("/ai/recommend", { productId: id })
          .then((response) => {
            setAiRecommendations(response.data || []);
          })
          .catch((err) => {
            console.error("AI recommendation fetch error:", err);
          });
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        <h2>Loading Product...</h2>
      </div>
    );
  }

  const currentPrice = Math.round(product.price * 95);
  const oldPrice = Math.round(currentPrice * 1.3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success("🛒 Product Added to Cart");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Product Section */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
      >
        {/* Image */}

        <div style={{ textAlign: "center" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "400px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src={product.image}
                alt=""
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}

        <div>
          <h1>{product.title}</h1>

          <p
            style={{
              color: "green",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            ⭐ {product.rating.rate} ({product.rating.count} Reviews)
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <h2>₹{currentPrice.toLocaleString("en-IN")}</h2>

            <span
              style={{
                textDecoration: "line-through",
                color: "#777",
              }}
            >
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>

            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              30% OFF
            </span>
          </div>

          <h3 style={{ color: "green", marginTop: "20px" }}>
            ✔ In Stock
          </h3>

          <p style={{ marginTop: "10px" }}>
            <strong>Category:</strong> {product.category}
          </p>

          <h3 style={{ marginTop: "25px" }}>Description</h3>

          <p
            style={{
              lineHeight: "1.8",
              color: "#555",
            }}
          >
            {product.description}
          </p>

          <h3 style={{ marginTop: "25px" }}>
            Quantity
          </h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >
              -
            </button>

            <h3>{quantity}</h3>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: "#ff9800",
                color: "#fff",
                border: "none",
                padding: "15px",
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
                background: "#2874f0",
                color: "#fff",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Buy Now
            </button>
          </div>

          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #ddd",
              paddingTop: "20px",
            }}
          >
            <h3>Product Highlights</h3>

            <ul style={{ lineHeight: "2" }}>
              <li>✔ 100% Original Product</li>
              <li>✔ Cash on Delivery Available</li>
              <li>✔ Easy 7-Day Returns</li>
              <li>✔ Free Shipping Across India</li>
              <li>✔ Secure Payment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <div style={{ marginTop: "60px", background: "linear-gradient(to right, #f5f3ff, #edd9ff)", padding: "30px", borderRadius: "15px", border: "1px solid #ddd6fe" }}>
          <h2 style={{ marginBottom: "5px", display: "flex", alignItems: "center", gap: "10px" }}>
            🤖 AI-Powered Product Recommendations
          </h2>
          <p style={{ color: "#6b21a8", fontSize: "0.95rem", marginBottom: "25px" }}>
            Smart recommendations generated in real-time by our Content-Based Vector similarity engine using TF-IDF matching on product titles, categories, and descriptions.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "25px",
            }}
          >
            {aiRecommendations.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}

      <div style={{ marginTop: "60px" }}>
        <h2 style={{ marginBottom: "25px" }}>
          🛍 You May Also Like
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;