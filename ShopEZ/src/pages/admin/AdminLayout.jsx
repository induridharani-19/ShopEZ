import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>🛒 ShopEZ Admin</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Link to="/admin" style={linkStyle}>
            📊 Dashboard
          </Link>

          <Link to="/admin/products" style={linkStyle}>
            📦 Products
          </Link>

          <Link to="/admin/orders" style={linkStyle}>
            📑 Orders
          </Link>

          <Link to="/admin/users" style={linkStyle}>
            👥 Users
          </Link>

          <Link to="/" style={linkStyle}>
            🚪 Back to Shop
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          background: "#f4f6f9",
          padding: "30px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "12px",
  borderRadius: "8px",
  background: "#334155",
};

export default AdminLayout;