import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

function Profile() {
  const { user, loading, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sync state with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Fetch orders from backend
  useEffect(() => {
    if (user) {
      setFetchingOrders(true);
      API.get("/orders/my-orders")
        .then((res) => {
          setOrders(res.data);
          setFetchingOrders(false);
        })
        .catch((err) => {
          console.error("Failed to fetch orders:", err);
          setFetchingOrders(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h1>👤 Access Denied</h1>
        <p style={{ margin: "20px 0", color: "#666" }}>
          Please login to view your profile and order history.
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(name, email, password || undefined);
      setIsEditing(false);
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 2.5fr",
        gap: "40px",
        alignItems: "start"
      }}
    >
      {/* Profile Details Sidebar */}
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            margin: "0 auto 20px auto",
            fontWeight: "bold"
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>

        {!isEditing ? (
          <>
            <h2>{user.name}</h2>
            <p style={{ color: "#666", margin: "10px 0 25px 0" }}>{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#f0f2f5",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "10px"
              }}
            >
              ✏ Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                New Password (leave blank to keep)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                style={inputStyle}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.name);
                  setEmail(user.email);
                  setPassword("");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Orders List Section */}
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>📦 My Orders</h2>

        {fetchingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3 style={{ color: "#888" }}>You haven't placed any orders yet.</h3>
            <button
              onClick={() => navigate("/products")}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#2874f0",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >
                {/* Order Header */}
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "15px 20px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px"
                  }}
                >
                  <div>
                    <span style={{ color: "#666", fontSize: "13px" }}>ORDER ID</span>
                    <h4 style={{ margin: "3px 0 0 0" }}>{order.id}</h4>
                  </div>
                  <div>
                    <span style={{ color: "#666", fontSize: "13px" }}>DATE PLACED</span>
                    <h4 style={{ margin: "3px 0 0 0" }}>
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </h4>
                  </div>
                  <div>
                    <span style={{ color: "#666", fontSize: "13px" }}>TOTAL AMOUNT</span>
                    <h4 style={{ margin: "3px 0 0 0", color: "#4f46e5" }}>
                      ₹{order.total.toLocaleString("en-IN")}
                    </h4>
                  </div>
                  <div>
                    <span style={{ color: "#666", fontSize: "13px" }}>STATUS</span>
                    <div style={{ marginTop: "3px" }}>
                      <span
                        style={{
                          background: "#e0f2fe",
                          color: "#0369a1",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: "20px" }}>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        padding: "10px 0",
                        borderBottom: "1px solid #f3f4f6"
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: "15px" }}>{item.title}</h4>
                        <p style={{ margin: "5px 0 0 0", color: "#666", fontSize: "13px" }}>
                          Qty: {item.quantity} × ₹
                          {Math.round(item.price * 95).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Shipping Address Summary */}
                  <div style={{ marginTop: "15px", fontSize: "13px", color: "#555" }}>
                    <strong>Ship To: </strong>
                    {order.shippingAddress.fullName}, {order.shippingAddress.phone},{" "}
                    {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </div>

                  {/* Payment Details Summary */}
                  <div style={{ marginTop: "10px", fontSize: "13px", color: "#555" }}>
                    <strong>Payment: </strong>
                    {order.paymentMethod === "cod" && (
                      <span>💵 Cash on Delivery</span>
                    )}
                    {order.paymentMethod === "upi" && (
                      <span>
                        📱 UPI ID:{" "}
                        <span style={{ fontFamily: "monospace", fontWeight: "600", color: "#2563eb" }}>
                          {order.paymentDetails?.upiId}
                        </span>
                      </span>
                    )}
                    {order.paymentMethod === "card" && (
                      <span>
                        💳 {order.paymentDetails?.cardBrand} card ending in{" "}
                        <span style={{ fontFamily: "monospace", fontWeight: "600", color: "#9333ea" }}>
                          {order.paymentDetails?.lastFour}
                        </span>{" "}
                        (Holder: {order.paymentDetails?.cardHolder})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  fontSize: "14px"
};

export default Profile;