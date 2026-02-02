import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";
import Home from "./pages/Home";
import AdminPanel from "./components/AdminPanel";
import OwnerDashboard from "./components/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/rooms/:id" element={<Rooms />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/owner" element={<OwnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
