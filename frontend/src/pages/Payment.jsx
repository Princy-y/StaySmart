import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login to book!");
      return;
    }

    setLoading(true);
    
    setTimeout(async () => { 
      try {
        await api.post("/api/bookings/confirm", {
          userEmail: userEmail,
          hotelName: state.hotelName || "Hotel", 
          roomType: state.roomType || "Deluxe",
          price: Number(state.price), 
          paymentMethod: method.toUpperCase()
        });

        alert(`Payment via ${method.toUpperCase()} Successful!`);
        navigate("/mybookings");
      } catch (err) { 
        console.error("Booking Error:", err.response?.data);
        alert("Transaction Failed - Check if all fields are filled"); 
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <div style={{ border: "1px solid #ddd", padding: "30px", display: "inline-block", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "400px" }}>
        <h2>Complete Payment</h2>
        <h3 style={{ color: "#971993" }}>Hotel: {state.hotelName}</h3>
        <h3 style={{ color: "#971993" }}>Amount: ₹{state.price}</h3>
        
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "20px" }}>
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI (GPay / PhonePe)</option>
        </select>

        {method === "card" ? (
          <input type="text" placeholder="Card Number (4242...)" style={{ width: "90%", padding: "10px", marginBottom: "10px" }} />
        ) : (
          <div>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pay-staysmart-${state.price}`} alt="QR" />
            <p>Scan to Pay ₹{state.price}</p>
          </div>
        )}

        <button onClick={handlePay} disabled={loading} style={{ backgroundColor: "#971993", color: "white", padding: "15px", width: "100%", border: "none", cursor: "pointer", marginTop: "20px", borderRadius: "5px" }}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
export default Payment;