import { Link } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import { toast } from "react-toastify";
import Testimonials from "../components/Testimonials";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api";

function Home() {
  const { addToCart } = useContext(CartContext);
  const categories = [
  {
    name: "Beauty",
    apiCategory: "beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500",
  },
  {
    name: "Fragrances",
    apiCategory: "fragrances",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
  },
  {
    name: "Furniture",
    apiCategory: "furniture",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
  },
  {
    name: "Groceries",
    apiCategory: "groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500",
  },
];
  const [flashSale, setFlashSale] = useState([]);

useEffect(() => {
  API.get("/products?limit=8")
    .then((res) => {
      setFlashSale(res.data.products || res.data);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    
    <div style={{ background: "#f8f9fc" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          color: "white",
          minHeight: "450px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "60px",
          borderRadius: "20px",
          margin: "20px",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "4rem",
              marginBottom: "10px",
            }}
          >
            ShopEZ
          </h1>

          <h2 style={{ fontSize: "2rem" }}>
            Mega Sale 2026 🔥
          </h2>

          <p
            style={{
              maxWidth: "500px",
              fontSize: "1.1rem",
              marginTop: "15px",
            }}
          >
            Discover fashion, electronics, mobiles and more.
            Get amazing deals with fast delivery and secure
            payments.
          </p>

          <Link to="/products">
            <button
              style={{
                marginTop: "25px",
                padding: "14px 30px",
                borderRadius: "10px",
                border: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
          alt="shopping"
          style={{
            width: "500px",
            maxWidth: "100%",
            borderRadius: "20px",
          }}
        />
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "20px",
          margin: "30px 20px",
          padding: "20px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div>
          <h2>24/7</h2>
          <p>Support</p>
        </div>

        <div>
          <h2>100%</h2>
          <p>Secure Payment</p>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Shop By Category
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {categories.map((category) => (
  <Link
    key={category.name}
    to={`/products?category=${category.apiCategory}`}
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          padding: "15px",
          textAlign: "center",
        }}
      >
        <h3>{category.name}</h3>
      </div>
    </div>
  </Link>
))}
        </div>
      </div>

      {/* Flash Sale */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          ⚡ Flash Sale
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {flashSale.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image || item.thumbnail}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "contain",
background: "#fff",
padding: "15px",
                  borderRadius: "10px",
                }}
              />
              
              <h3>{item.title}</h3>

              <p>
                <del>
₹{Math.round(item.price * 1.2)}
</del>{" "}
                <span
                  style={{
                    color: "#4f46e5",
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.price}
                </span>
              </p>
<button
  onClick={() => {
    addToCart(item);
    toast.success(`${item.title} added to cart 🛒`);
  }}
  style={{
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Add To Cart
</button>
            </div>
          ))}
        </div>
            </div>

      {/* Featured Products */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          ⭐ Featured Products
        </h2>

        <FeaturedProducts />
      </div>

      {/* Customer Reviews */}
      <Testimonials />

      {/* Features */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          padding: "30px",
        }}
      >
        
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>🚚</h2>
          <h3>Fast Delivery</h3>
          <p>Delivered to your doorstep</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>🔒</h2>
          <h3>Secure Payment</h3>
          <p>Safe and trusted checkout</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2>↩</h2>
          <h3>Easy Returns</h3>
          <p>7-Day Return Guarantee</p>
        </div>
      </div>

      {/* Newsletter */}
      <div
        style={{
          background: "#4f46e5",
          color: "white",
          textAlign: "center",
          padding: "50px",
          margin: "20px",
          borderRadius: "15px",
        }}
      >
        <h2>Subscribe For Exclusive Offers</h2>
        <p>Get updates on new arrivals and discounts.</p>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "12px",
            width: "300px",
            maxWidth: "90%",
            borderRadius: "8px",
            border: "none",
            marginTop: "15px",
          }}
        />
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "white",
          marginTop: "20px",
        }}
      >
        <h1>Start Shopping Today</h1>

        <p>
          Explore trending products and exclusive deals.
        </p>

        <Link to="/products">
          <button
            style={{
              marginTop: "20px",
              padding: "14px 30px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Explore Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;