import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    API
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Search from Navbar
  useEffect(() => {

    const handleSearch = (e) => {
      setSearchTerm(e.detail.toLowerCase());
    };

    window.addEventListener("search", handleSearch);

    return () => {
      window.removeEventListener("search", handleSearch);
    };
  }, []);
  useEffect(() => {
  const selectedCategory = searchParams.get("category");

  if (!selectedCategory) {
    setCategory("all");
    return;
  }

  if (selectedCategory === "fashion") {
    setCategory("men's clothing");
  } else if (selectedCategory === "electronics") {
    setCategory("electronics");
  } else if (selectedCategory === "mobiles") {
    setCategory("electronics");
  } else if (selectedCategory === "groceries") {
    setCategory("all");
  }
}, [searchParams]);

  // Categories
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category)),
  ];

  // Filter
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm);

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sortBy === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    filteredProducts.sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
  }

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
        }}
      >
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🛍 Our Products
      </h1>

      {/* Filter Section */}
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
          border: "1px solid #f0f2f5",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        {/* Row 1: Search & Sort */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          {/* Local Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f3f4f6",
              borderRadius: "10px",
              padding: "10px 16px",
              width: "100%",
              maxWidth: "400px"
            }}
          >
            <span style={{ marginRight: "10px", color: "#9ca3af" }}>🔍</span>
            <input
              type="text"
              placeholder="Search products, brands and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                width: "100%",
                fontSize: "15px",
                color: "#1f2937"
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  fontSize: "16px",
                  padding: "0"
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#6b7280" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "10px 15px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                background: "white",
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value="">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Row 2: Categories Row */}
        <div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "5px",
              scrollbarWidth: "none" // Hide scrollbar for clean style
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: category === cat ? "none" : "1px solid #e5e7eb",
                  background: category === cat ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "white",
                  color: category === cat ? "white" : "#4b5563",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  boxShadow: category === cat ? "0 4px 10px rgba(79, 70, 229, 0.25)" : "none"
                }}
                onMouseOver={(e) => {
                  if (category !== cat) {
                    e.target.style.background = "#f9fafb";
                    e.target.style.borderColor = "#d1d5db";
                  }
                }}
                onMouseOut={(e) => {
                  if (category !== cat) {
                    e.target.style.background = "white";
                    e.target.style.borderColor = "#e5e7eb";
                  }
                }}
              >
                {cat === "all" ? "🛍 All Products" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          marginBottom: "20px",
          color: "#666",
        }}
      >
        Showing {filteredProducts.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
          }}
        >
          No products found 😢
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;