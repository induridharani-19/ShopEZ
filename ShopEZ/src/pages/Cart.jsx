import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoDiscount(0.1);
      toast.success("🎟 Promo code 'SAVE10' applied! 10% extra discount");
    } else {
      toast.error("❌ Invalid promo code. Try 'SAVE10'!");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Math.round(item.price * 95) * item.quantity,
    0
  );

  const delivery = subtotal > 1000 ? 0 : 99;
  const discount = Math.round(subtotal * 0.1);
  const promoDiscountAmount = Math.round((subtotal - discount) * promoDiscount);
  const total = subtotal + delivery - discount - promoDiscountAmount;

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px",
        }}
      >
        <h1>🛒 Your Cart is Empty</h1>

        <p>Add some amazing products to your cart.</p>

        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            background: "#2874f0",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px",
      }}
    >
      {/* Cart Items */}

      <div>
        <h1 style={{ marginBottom: "20px" }}>
          Shopping Cart ({cartItems.length})
        </h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              gap: "20px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
              }}
            />

            <div style={{ flex: 1 }}>
              <h3>{item.title}</h3>

              <p
                style={{
                  color: "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                In Stock
              </p>

              <h2>
                ₹
                {Math.round(item.price * 95).toLocaleString(
                  "en-IN"
                )}
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <h3>{item.quantity}</h3>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  style={{
                    marginLeft: "20px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          height: "fit-content",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb"
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", marginBottom: "20px" }}>
          🧾 Order Summary
        </h2>

        {/* Pricing Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", margin: "20px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563", fontSize: "15px" }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: "600", color: "#1f2937" }}>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563", fontSize: "15px", alignItems: "center" }}>
            <span>
              ShopEZ Discount
              <span style={{ background: "#ecfdf5", color: "#059669", padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", marginLeft: "8px" }}>
                10% OFF
              </span>
            </span>
            <span style={{ fontWeight: "600", color: "#059669" }}>-₹{discount.toLocaleString("en-IN")}</span>
          </div>

          {promoDiscount > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563", fontSize: "15px", alignItems: "center" }}>
              <span>
                Promo Code
                <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", marginLeft: "8px" }}>
                  SAVE10
                </span>
              </span>
              <span style={{ fontWeight: "600", color: "#2563eb" }}>-₹{promoDiscountAmount.toLocaleString("en-IN")}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563", fontSize: "15px" }}>
            <span>Delivery Charges</span>
            <span style={{ fontWeight: "600", color: delivery === 0 ? "#059669" : "#1f2937" }}>
              {delivery === 0 ? "FREE" : `₹${delivery}`}
            </span>
          </div>
        </div>

        {/* Coupon input */}
        <div style={{ margin: "25px 0 15px 0", borderTop: "1px solid #f3f4f6", paddingTop: "20px" }}>
          <p style={{ fontSize: "14px", fontWeight: "bold", color: "#374151", marginBottom: "8px" }}>
            Have a promo code?
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="e.g. SAVE10"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoDiscount > 0}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                textTransform: "uppercase",
                background: promoDiscount > 0 ? "#f3f4f6" : "white"
              }}
            />
            <button
              onClick={handleApplyPromo}
              disabled={promoDiscount > 0}
              style={{
                padding: "10px 16px",
                background: promoDiscount > 0 ? "#9ca3af" : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: promoDiscount > 0 ? "default" : "pointer"
              }}
            >
              {promoDiscount > 0 ? "Applied" : "Apply"}
            </button>
          </div>
        </div>

        <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #f3f4f6" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "25px" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#111827" }}>Total Amount</span>
          <span style={{ fontSize: "24px", fontWeight: "900", color: "#4f46e5" }}>
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>

        {user ? (
          <button
            onClick={() => navigate("/checkout")}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #ff7e40, #ff5100)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 14px rgba(255, 81, 0, 0.4)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 81, 0, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 14px rgba(255, 81, 0, 0.4)";
            }}
          >
            Proceed to Checkout ➡️
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 6px 20px rgba(79, 70, 229, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 14px rgba(79, 70, 229, 0.4)";
            }}
          >
            🔒 Login to Checkout & Delivery
          </button>
        )}

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "18px", color: "#6b7280", fontSize: "12px" }}>
          <span>🔒</span>
          <span>Secure SSL 256-Bit Checkout</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;