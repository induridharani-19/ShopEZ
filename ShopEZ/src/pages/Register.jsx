import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ padding: "50px", textAlign: "center" }}>
      <h1>Create Account</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2874f0", fontWeight: "bold" }}>
          Login here
        </Link>
      </p>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px"
};

export default Register;