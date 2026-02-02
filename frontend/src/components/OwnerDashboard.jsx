import { useState } from "react";
import api from "../api";

function OwnerDashboard() {
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    image: "",
    rooms: [{ type: "Deluxe", price: "", image: "" }] 
  });

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const ownerEmail = localStorage.getItem("userEmail"); 
      
      const res = await api.post("/api/owner/add-hotel", { 
        ...hotel, 
        ownerEmail 
      });
      
      alert(res.data.msg);
      setHotel({ 
        name: "", 
        location: "", 
        image: "", 
        rooms: [{ type: "Deluxe", price: "", image: "" }] 
      }); 
    } catch (err) {
      alert("Error adding hotel");
    }
  };

  const addRoomField = () => {
    setHotel({
      ...hotel,
      rooms: [...hotel.rooms, { type: "Standard", price: "", image: "" }]
    });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Hotel Owner Panel</h2>
      <p style={{ textAlign: "center", color: "gray" }}>Add your property to StaySmart</p>
      
      <form onSubmit={handleAddHotel} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" placeholder="Hotel Name" required value={hotel.name}
          onChange={(e) => setHotel({...hotel, name: e.target.value})} style={styles.input} />
        
        <input type="text" placeholder="Location (City)" required value={hotel.location}
          onChange={(e) => setHotel({...hotel, location: e.target.value})} style={styles.input} />
        
        <input type="text" placeholder="Main Hotel Image URL" required value={hotel.image}
          onChange={(e) => setHotel({...hotel, image: e.target.value})} style={styles.input} />

        <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px" }}>
          <h4 style={{ marginBottom: "10px" }}>Room Details</h4>
          
          {hotel.rooms.map((room, index) => (
  <div key={index} style={{ marginBottom: "15px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input 
        type="text" 
        placeholder="Room Type (e.g. Suite)" 
        value={room.type}
        onChange={(e) => {
          let newRooms = [...hotel.rooms];
          newRooms[index].type = e.target.value;
          setHotel({...hotel, rooms: newRooms});
        }}
        style={styles.input}
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={room.price}
        onChange={(e) => {
          let newRooms = [...hotel.rooms];
          newRooms[index].price = e.target.value;
          setHotel({...hotel, rooms: newRooms});
        }}
        style={styles.input}
      />
      <input 
        type="text" 
        placeholder="Room Image URL" 
        value={room.image}
        onChange={(e) => {
          let newRooms = [...hotel.rooms];
          newRooms[index].image = e.target.value;
          setHotel({...hotel, rooms: newRooms});
        }}
        style={styles.input}
      />
    </div>
  </div>
))}
          <button type="button" onClick={addRoomField} style={styles.addBtn}>
            + Add Another Room Type
          </button>
        </div>

        <button type="submit" style={styles.button}>List My Hotel</button>
      </form>
    </div>
  );
}

const styles = {
  input: { padding: "12px", borderRadius: "5px", border: "1px solid #ccc", width: "100%", marginBottom: "5px" },
  button: { padding: "15px", backgroundColor: "#971993", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" },
  addBtn: { background: "#4CAF50", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", width: "100%" }
};

export default OwnerDashboard;