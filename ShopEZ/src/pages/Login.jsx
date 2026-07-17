import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// Google Client ID loaded from environment variables or fallback placeholder
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "879535459202-qtmei9vt3v3q5254c4lnvl6hvg74pr0c.apps.googleusercontent.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      // Check if Google Client Library is loaded
      if (window.google?.accounts?.id) {
        if (!window.googleSignInInitialized) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              if (window.latestGoogleCallback) {
                window.latestGoogleCallback(response);
              }
            },
            auto_select: false
          });
          window.googleSignInInitialized = true;
        }

        window.google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          {
            theme: "outline",
            size: "large",
            width: "360",
            text: "signin_with",
            shape: "rectangular"
          }
        );
      } else {
        // Retry loading after a brief delay if script loads asynchronously
        setTimeout(initializeGoogleSignIn, 300);
      }
    };

    window.latestGoogleCallback = handleGoogleCallback;
    initializeGoogleSignIn();
  }, []);

  const handleGoogleCallback = async (response) => {
    try {
      await loginWithGoogle(response.credential);
      navigate("/profile");
    } catch (err) {
      console.error("Google login callback error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ padding: "50px", textAlign: "center" }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
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
            background: "#2874f0",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Login
        </button>
      </form>

      <div style={{ maxWidth: "400px", margin: "15px auto", position: "relative", textAlign: "center" }}>
        <div style={{ borderBottom: "1px solid #ccc", margin: "20px 0" }}>
          <span style={{ background: "#f8f9fc", padding: "0 10px", color: "#666", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            OR
          </span>
        </div>
      </div>

      <div
        id="googleBtn"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          minHeight: "45px"
        }}
      ></div>

      <p style={{ marginTop: "30px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#2874f0", fontWeight: "bold" }}>
          Register here
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

export default Login;