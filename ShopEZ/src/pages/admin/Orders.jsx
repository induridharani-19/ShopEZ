import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

function Orders() {
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load orders");
    }
  };

  const deleteOrder = async (id) => {
    const updateStatus = async (id, status) => {
  try {
    await API.put(`/orders/${id}`, {
      status,
    });

    toast.success("Status Updated");

    fetchOrders();
  } catch (error) {
    console.log(error);
    toast.error("Update Failed");
  }
};
    if (!window.confirm("Delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);

      toast.success("Order Deleted");

      fetchOrders();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📑 Orders Management</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th style={{ padding: "12px" }}>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
  <tr
    key={order._id}
    style={{ borderBottom: "1px solid #ddd" }}
  >
    <td style={{ padding: "10px" }}>{index + 1}</td>

    <td>{order.userId?.name || "Unknown User"}</td>

    <td>{order.userId?.email || "No Email"}</td>

    <td>₹{order.total}</td>

    <td>
  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
  >
    <option value="Placed">Placed</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Packed">Packed</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
</td>

    <td>
      <button
        onClick={() => deleteOrder(order._id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </td>
  </tr>
))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;