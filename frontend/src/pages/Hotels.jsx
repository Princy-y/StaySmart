
import { useEffect, useState } from "react";
import api from "../api";
import Hotelcard from "../components/Hotelcard";
import Searchbox from "./Searchbox";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    api.get("/api/hotels").then((res) => {
      setHotels(res.data);
      setFiltered(res.data);
    });
  }, []);

  const handleSearch = (dest) => {
    if (!dest) setFiltered(hotels);
    else
      setFiltered(
        hotels.filter((h) =>
          h.location.toLowerCase().includes(dest.toLowerCase())
        )
      );
  };

  return (
    <div>
      <Searchbox onSearch={handleSearch} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
        {filtered.map((hotel) => (
          <Hotelcard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;