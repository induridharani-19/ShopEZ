function Categories() {
  const categories = [
    "👕 Fashion",
    "👟 Shoes",
    "📱 Electronics",
    "⌚ Watches",
    "💍 Jewellery",
    "🏠 Home",
  ];

  return (
    <div style={{ padding: "40px 20px" }}>
      <h2>Shop by Category</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {categories.map((item) => (
          <div
            key={item}
            style={{
              background: "#fff",
              padding: "30px",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              cursor: "pointer",
            }}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;