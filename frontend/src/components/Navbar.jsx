import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
    window.location.reload(); 
  };

  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "15px 30px", 
      backgroundColor: "#333", 
      color: "white",
      alignItems: "center"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>StaySmart 😉</Link>
      </div>
      
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        <Link to="/hotels" style={{ color: "white", textDecoration: "none" }}>Hotels</Link>
                {role === "admin" && (
          <Link to="/admin" style={{ color: "#ff4d4d", textDecoration: "none", fontWeight: "bold" }}>
            Admin Panel
          </Link>
        )}

        {role === "owner" && (
          <Link to="/owner" style={{ color: "#4db8ff", textDecoration: "none", fontWeight: "bold" }}>
            Owner Dashboard
          </Link>
        )}

        {role === "customer" && (
          <Link to="/mybookings" style={{ color: "white", textDecoration: "none" }}>
            My Bookings
          </Link>
        )}
        
        {userEmail ? (
          <>
            <span style={{ color: "#ffc107" }}>Hi, {userName}</span>
            <button 
              onClick={handleLogout} 
              style={{ 
                backgroundColor: "#9f28a7", 
                color: "white", 
                border: "none", 
                padding: "8px 15px", 
                borderRadius: "5px", 
                cursor: "pointer" 
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ 
            backgroundColor: "#9f28a7", 
            color: "white", 
            padding: "8px 15px", 
            borderRadius: "5px", 
            textDecoration: "none" 
          }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;