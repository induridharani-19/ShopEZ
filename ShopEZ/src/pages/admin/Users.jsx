import { useEffect, useState } from "react";
import API from "../../api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {
    const res = await API.get("/auth/users");

    console.log("Users API Response:", res.data);

    setUsers(res.data);
  } catch (err) {
    console.error("Users Fetch Error:", err);
  }
};

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Unable to delete user");
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>
        👥 Users Management
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead
          style={{
            background: "#4f46e5",
            color: "white",
          }}
        >
          <tr>
            <th style={th}>#</th>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td style={td}>{index + 1}</td>
                <td style={td}>{user.name}</td>
                <td style={td}>{user.email}</td>

                <td style={td}>
                  <button
                    onClick={() => deleteUser(user._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "6px",
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

const th = {
  padding: "15px",
  textAlign: "left",
};

const td = {
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

export default Users;