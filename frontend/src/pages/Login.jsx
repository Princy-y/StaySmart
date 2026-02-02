import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", { email, password });
      
      alert(res.data.msg);
      
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userRole", res.data.user.role); 
      
      const userRole = res.data.user.role;

      if (userRole === "admin") {
        window.location.href = "/admin"; 
      } else if (userRole === "owner") {
        window.location.href = "/owner"; 
      } else {
        window.location.href = "/hotels"; 
      }

    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className="login">
      <div className="page">
        <center><h1>Login</h1></center>

        <div className="lform">
          <form onSubmit={handleLogin}>
            <table className="tab">
              <tbody>
                <tr>
                  <td>
                    <input
                      className="in"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input
                      className="in"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <center>
                      <button className="btn" type="submit">
                        Login
                      </button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>

            <center>
              <p>
                Don't have an account? 🫨{" "}
                <Link to="/signup">SignUp!!</Link>
              </p>
            </center> 
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;