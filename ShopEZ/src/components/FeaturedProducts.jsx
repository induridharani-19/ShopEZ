import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        // Slice the first 4 products to feature
        setProducts(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h3>Loading Featured Products...</h3>
      </div>
    );
  }

  return (
    <section style={{ padding: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <div style={{ background: "#fafafa", padding: "20px" }}>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain"
                }}
              />
            </div>

            <div
              style={{
                padding: "15px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  height: "44px",
                  overflow: "hidden",
                  margin: "0 0 10px 0"
                }}
              >
                {product.title}
              </h3>

              <div>
                <p
                  style={{
                    color: "#2874f0",
                    fontWeight: "bold",
                    fontSize: "18px",
                    margin: "0 0 15px 0"
                  }}
                >
                  ₹{Math.round(product.price * 95).toLocaleString("en-IN")}
                </p>

                <Link to={`/product/${product.id}`}>
                  <button
                    style={{
                      background: "#2874f0",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: "bold"
                    }}
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;