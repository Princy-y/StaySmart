import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function Rooms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState("");

  useEffect(() => {
    api.get(`/api/hotels/${id}/rooms`).then((res) => setRooms(res.data));

    api.get("/api/hotels").then((res) => {
      const currentHotel = res.data.find((h) => h._id === id); 
      if (currentHotel) {
        setHotelName(currentHotel.name);
      }
    });
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Available Rooms in {hotelName || "Loading..."}</h2>
      
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {rooms.map((r, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "250px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <img src={r.image} alt={r.type} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }} />
            <h3>{r.type}</h3>
            <p>Price: <strong>₹{r.price}</strong></p>
            
            <button 
              onClick={() => {
                if (!hotelName) {
                  alert("Wait for hotel data to load!");
                  return;
                }
                navigate("/payment", { 
                  state: { 
                    hotelName: hotelName, 
                    roomType: r.type,   
                    price: r.price      
                  } 
                });
              }}
              style={{ 
                backgroundColor: "#92297f", 
                color: "white", 
                padding: "10px", 
                border: "none", 
                width: "100%", 
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;