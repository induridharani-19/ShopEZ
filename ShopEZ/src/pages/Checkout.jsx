import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Payment Form States
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Input Formatting Handlers
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(" "));
    } else {
      setCardNumber(value);
    }
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/gi, "");
    if (value.length >= 2) {
      setCardExpiry(value.slice(0, 2) + "/" + value.slice(2, 4));
    } else {
      setCardExpiry(value);
    }
  };

  const handleCardCvvChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/gi, "");
    setCardCvv(value.slice(0, 3));
  };

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

  const handlePlaceOrder = async () => {
    if (!fullName || !phone || !address || !city || !state || !pincode) {
      toast.error("Please fill in all shipping details 🚚");
      return;
    }

    let paymentDetails = {};
    if (payment === "upi") {
      if (!upiId || !upiId.includes("@")) {
        toast.error("Please enter a valid UPI ID (e.g., user@bank) 📱");
        return;
      }
      paymentDetails = { upiId };
    } else if (payment === "card") {
      const cleanCardNum = cardNumber.replace(/\s/g, "");
      if (!cleanCardNum || cleanCardNum.length !== 16) {
        toast.error("Please enter a valid 16-digit Credit Card Number 💳");
        return;
      }
      if (!cardExpiry || cardExpiry.length !== 5 || !cardExpiry.includes("/")) {
        toast.error("Please enter the expiration date in MM/YY format 📅");
        return;
      }
      if (!cardCvv || cardCvv.length !== 3) {
        toast.error("Please enter a valid 3-digit CVV number 🔒");
        return;
      }
      if (!cardName || cardName.trim() === "") {
        toast.error("Please enter the cardholder name 👤");
        return;
      }
      paymentDetails = {
        cardNumber,
        cardExpiry,
        cardCvv,
        cardName
      };
    }

    try {
      const res = await API.post("/orders", {
        items: cartItems,
        shippingAddress: { fullName, phone, address, city, state, pincode },
        paymentMethod: payment,
        paymentDetails,
        subtotal,
        delivery,
        discount: discount + promoDiscountAmount,
        total
      });

      if (res.status === 201) {
        toast.success("🎉 Order Placed Successfully!");
        clearCart();
        navigate("/profile");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to place order";
      toast.error(msg);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Loading Checkout...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h1>👤 Authentication Required</h1>
        <p style={{ margin: "20px 0", color: "#666" }}>
          Please login to proceed with your checkout.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 30px",
            background: "#2874f0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px",
        padding: "20px"
      }}
    >
      {/* Shipping Form */}
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,.1)"
        }}
      >
        <h2>🚚 Shipping Address</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          placeholder="Complete Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            ...inputStyle,
            height: "80px"
          }}
          required
        />

        <div
          style={{
            display: "flex",
            gap: "15px"
          }}
        >
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={inputStyle}
          required
        />

        <h2 style={{ marginTop: "30px" }}>
          💳 Payment Method
        </h2>

        <div style={{ marginTop: "15px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: payment === "cod" ? "#f0fdf4" : "#f8fafc", border: payment === "cod" ? "1px solid #22c55e" : "1px solid #e2e8f0", padding: "12px 20px", borderRadius: "10px", margin: 0, fontWeight: "600", color: payment === "cod" ? "#16a34a" : "#4b5563", transition: "all 0.2s" }}>
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
                style={{ accentColor: "#22c55e", cursor: "pointer" }}
              />
              💵 Cash on Delivery
            </label>

            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: payment === "upi" ? "#eff6ff" : "#f8fafc", border: payment === "upi" ? "1px solid #2563eb" : "1px solid #e2e8f0", padding: "12px 20px", borderRadius: "10px", margin: 0, fontWeight: "600", color: payment === "upi" ? "#2563eb" : "#4b5563", transition: "all 0.2s" }}>
              <input
                type="radio"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
                style={{ accentColor: "#2563eb", cursor: "pointer" }}
              />
              📱 UPI / QR Code
            </label>

            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", background: payment === "card" ? "#fbf7ff" : "#f8fafc", border: payment === "card" ? "1px solid #9333ea" : "1px solid #e2e8f0", padding: "12px 20px", borderRadius: "10px", margin: 0, fontWeight: "600", color: payment === "card" ? "#9333ea" : "#4b5563", transition: "all 0.2s" }}>
              <input
                type="radio"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
                style={{ accentColor: "#9333ea", cursor: "pointer" }}
              />
              💳 Credit / Debit Card
            </label>
          </div>

          <style>{`
            @keyframes scan {
              0% { top: 0%; }
              50% { top: 100%; }
              100% { top: 0%; }
            }
          `}</style>

          {/* Conditional Payment Detail Forms */}
          {payment === "cod" && (
            <div style={paymentPanelStyle}>
              <p style={{ margin: 0, color: "#16a34a", fontWeight: "bold", fontSize: "15px" }}>
                💵 Pay with cash or card upon delivery
              </p>
              <p style={{ margin: "6px 0 0 0", color: "#6b7280", fontSize: "13px", lineHeight: "1.4" }}>
                Additional cash delivery convenience fees: <strong>FREE</strong>. Please keep the exact amount ready when the shipping agent arrives at your address.
              </p>
            </div>
          )}

          {payment === "upi" && (
            <div style={paymentPanelStyle}>
              <div style={{ display: "flex", gap: "25px", alignItems: "center", flexWrap: "wrap" }}>
                {/* Mock QR Code Card */}
                <div style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "12px",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  position: "relative",
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  {/* Laser scanning beam mock */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background: "#ef4444",
                    boxShadow: "0 0 8px #ef4444",
                    animation: "scan 2s linear infinite"
                  }}></div>
                  {/* Mock QR image */}
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=ShopEZ-Demo-Pay"
                    alt="Scan QR"
                    style={{ width: "110px", height: "110px", objectFit: "contain" }}
                  />
                </div>
                
                {/* UPI Input */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold", color: "#374151" }}>
                    Scan QR to Pay or enter UPI ID:
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "8px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                      boxSizing: "border-box",
                      outline: "none"
                    }}
                  />
                  <p style={{ margin: "6px 0 0 0", color: "#6b7280", fontSize: "12px", lineHeight: "1.4" }}>
                    Enter your Virtual Payment Address (VPA) and click Place Order to verify and checkout.
                  </p>
                </div>
              </div>
            </div>
          )}

          {payment === "card" && (
            <div style={paymentPanelStyle}>
              <h3 style={{ margin: "0 0 15px 0", fontSize: "15px", fontWeight: "bold", color: "#374151" }}>
                💳 Enter Card Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                <div>
                  <label style={cardLabelStyle}>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    style={cardInputStyle}
                    required
                  />
                </div>
                <div>
                  <label style={cardLabelStyle}>Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength="19"
                    style={cardInputStyle}
                    required
                  />
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={cardLabelStyle}>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleCardExpiryChange}
                      maxLength="5"
                      style={cardInputStyle}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={cardLabelStyle}>CVV</label>
                    <input
                      type="password"
                      placeholder="***"
                      value={cardCvv}
                      onChange={handleCardCvvChange}
                      maxLength="3"
                      style={cardInputStyle}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
            <span>Total Items</span>
            <span style={{ fontWeight: "600", color: "#1f2937" }}>{cartItems.length}</span>
          </div>

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

        <button
          onClick={handlePlaceOrder}
          style={{
            width: "100%",
            padding: "16px",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 14px rgba(34, 197, 94, 0.4)";
          }}
        >
          ✅ Place Order
        </button>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "18px", color: "#6b7280", fontSize: "12px" }}>
          <span>🔒</span>
          <span>Secure SSL 256-Bit Checkout</span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: "15px",
  fontSize: "16px",
};

const paymentPanelStyle = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "15px",
  boxSizing: "border-box",
};

const cardLabelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#4b5563",
  marginBottom: "5px",
};

const cardInputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  boxSizing: "border-box",
  background: "white",
};

export default Checkout;