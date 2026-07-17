function Newsletter() {
  return (
    <div
      style={{
        background: "#2874f0",
        color: "white",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <h2>Subscribe to our Newsletter</h2>

      <p>Get the latest offers and discounts.</p>

      <input
        type="email"
        placeholder="Enter your email"
        style={{
          padding: "12px",
          width: "300px",
          marginTop: "20px",
        }}
      />

      <button
        style={{
          padding: "12px 25px",
          marginLeft: "10px",
          background: "#ff9800",
          color: "white",
          border: "none",
        }}
      >
        Subscribe
      </button>
    </div>
  );
}

export default Newsletter;