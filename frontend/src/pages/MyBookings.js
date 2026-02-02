import { useEffect, useState } from "react";
import api from "../api"; 

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchBookings = async () => {
      if (userEmail) {
        try {
          const res = await api.get(`/api/bookings/${userEmail}`);
          setBookings(res.data);
        } catch (err) {
          console.error("Error fetching bookings", err);
        }
      }
    };
    fetchBookings();
  }, [userEmail]);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>My Bookings</h2>
      
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No Bookings found.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
          {bookings.map((b) => (
            <div key={b._id} style={{ 
              border: "1px solid #ddd", 
              padding: "15px", 
              borderRadius: "8px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ margin: "0 0 10px 0" }}>{b.hotelName}</h3>
              <p><strong>Room:</strong> {b.roomType}</p>
              <p><strong>Price:</strong> ₹{b.price}</p>
              <p style={{ fontSize: "0.8rem", color: "gray" }}>
                Booked on: {new Date(b.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;