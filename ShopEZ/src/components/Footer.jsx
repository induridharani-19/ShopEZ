import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Footer.css";

function Footer() {
  const showDemoInfo = (type) => {
    if (type === "contact") {
      toast.info("📞 Contact Support: support@shopez.com | Toll-Free: +1 (800) 123-4567", {
        position: "bottom-right"
      });
    } else if (type === "faq") {
      toast.info("💡 FAQ: ShopEZ backend hashes passwords using bcrypt, verifies user login using JWT tokens, and persists order details to a local database.", {
        position: "bottom-right",
        autoClose: 5000
      });
    } else if (type === "privacy" || type === "terms") {
      toast.info("🔒 Policy: ShopEZ uses JWT tokens in localStorage to maintain secure customer sessions and orders.", {
        position: "bottom-right"
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h3>ShopEZ</h3>
          <p>
            ShopEZ is your one-stop destination for fashion,
            electronics, accessories and much more at the best prices.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Service</h3>
          <a href="#" onClick={(e) => { e.preventDefault(); showDemoInfo("contact"); }}>
            Contact Us
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showDemoInfo("faq"); }}>
            FAQs
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showDemoInfo("privacy"); }}>
            Privacy Policy
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); showDemoInfo("terms"); }}>
            Terms & Conditions
          </a>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            📘 Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            📷 Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            🐦 Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            💼 LinkedIn
          </a>
        </div>

        {/* Demo Details */}
        <div className="footer-section" style={{ borderLeft: "1px dashed #555", paddingLeft: "15px" }}>
          <h3>Demo Credentials</h3>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            📧 <strong>Email:</strong><br />
            <span style={{ fontFamily: "monospace", color: "#ffe082" }}>demo@shopez.com</span>
          </p>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            🔑 <strong>Password:</strong><br />
            <span style={{ fontFamily: "monospace", color: "#ffe082" }}>password123</span>
          </p>
          <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#bbb", lineHeight: "1.4" }}>
            Use these pre-seeded credentials at login to test profile editing and checkout order histories immediately.
          </p>
        </div>
      </div>

      <hr />

      <p className="copyright">
        © 2026 ShopEZ. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;