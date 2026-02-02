import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [allPayments, setAllPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    
    if (role !== "admin") {
      alert("Access Denied: Admins Only!");
      navigate("/login");
      return;
    } 
    api.get("/api/admin/payments").then(res => setAllPayments(res.data));
  }, [navigate]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard: Payment Logs</h2>
      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>User Email</th>
            <th>Hotel</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {allPayments.map(p => (
            <tr key={p._id}>
              <td>{p.userEmail}</td>
              <td>{p.hotelName}</td>
              <td>₹{p.price}</td>
              <td>{p.paymentMethod.toUpperCase()}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AdminPanel;