import { useNavigate } from "react-router-dom";

function Hotelcard({ hotel }) {
  const navigate = useNavigate();

  if (!hotel) return null;

  return (
    <div style={{ margin: "20px", padding: "20px", display: "flex", gap: "10px", border: "1px solid #ccc", borderRadius: "8px", width: "600px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginLeft: "500px" }}> 
      <img
        src={hotel.image}
        alt={hotel.name}
        style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "5px" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "30px" }}>
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
        <button onClick={() => navigate(`/rooms/${hotel._id}`)} 
          style={{
            backgroundColor: "#971993",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          View Rooms
        </button> 
      </div>
    </div>
  );
}

export default Hotelcard;