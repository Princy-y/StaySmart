import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import api from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer"); 

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password,
        role 
      });

      alert(res.data.msg);
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="login">
      <div className="page">
        <center><h1>Create Account</h1></center>

        <form className="txtbx" onSubmit={handleSignup}>
          <input
            className="in"
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="in"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="in"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="in"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


            <select className="in"
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ padding: "12px", width: "92%", borderRadius: "15px", borderColor: "purple" }}
            >
              <option value="customer">Customer</option>
              <option value="owner">Hotel Owner</option>
            </select>
          

          <button className="btn" type="submit">
            SignUp
          </button>

          <p>
            Already have an account? 🫨{" "}
            <Link to="/login">Login!!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;