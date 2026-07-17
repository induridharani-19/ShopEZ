import { useEffect, useState } from "react";
import API from "../../api";

function Dashboard() {
  const [stats, setStats] = useState({
    productCount: 0,
    userCount: 0,
    orderCount: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/orders/dashboard-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load dashboard statistics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", fontFamily: "Outfit, sans-serif" }}>
        <h2>Loading Dashboard Statistics...</h2>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>📊 Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
          fontFamily: "Outfit, sans-serif"
        }}
      >
        <Card title="Products" value={stats.productCount.toString()} color="#3b82f6" />
        <Card title="Users" value={stats.userCount.toString()} color="#10b981" />
        <Card title="Orders" value={stats.orderCount.toString()} color="#f59e0b" />
        <Card title="Revenue" value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`} color="#ef4444" />
      </div>
    </>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontWeight: 500, fontSize: "16px" }}>{title}</h3>
      <h1 style={{ margin: 0, fontWeight: 700, fontSize: "32px" }}>{value}</h1>
    </div>
  );
}

export default Dashboard;