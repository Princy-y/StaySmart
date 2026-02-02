import { useState } from "react";

function Searchbox({ onSearch }) {
  const [dest, setDest] = useState("");

  return (
    <><center>
      <input
        placeholder="Search destination"
        value={dest}
        onChange={(e) => setDest(e.target.value)}
        style={{padding:"10px",marginTop:"5px",marginRight:"5px",borderRadius:"5px"}}
      />
      <button onClick={() => onSearch(dest)} 
        style={{padding:"10px",marginTop:"5px",marginRight:"5px",borderRadius:"5px",backgroundColor:"#971993",color:"white",border:"none",cursor:"pointer"}}
        >Search   
      </button>
      </center>
    </>

  );
}

export default Searchbox;
