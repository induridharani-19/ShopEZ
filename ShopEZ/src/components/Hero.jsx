import hero from "../assets/hero.png";

function Hero() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg,#2874f0,#00c6ff)",
        color: "white",
        padding: "60px",
        borderRadius: "15px",
        margin: "20px auto",
      }}
    >
      <div>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Mega Sale 2026
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "20px" }}>
          Up to 70% OFF on Fashion, Electronics & Shoes
        </p>

        <button
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            background: "#ff9800",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Shop Now
        </button>
      </div>

      <img
        src={hero}
        alt="Hero"
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
      />
    </section>
  );
}

export default Hero;