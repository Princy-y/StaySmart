const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/staysmart")
  .then(()=>console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const HotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String, 
  rooms: [{
    type: { type: String }, 
    price: Number,
    image: String 
  }],
  ownerEmail: String 
});
const Hotel = mongoose.model("Hotel", HotelSchema);

const BookingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  hotelName: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, default: "Card" },
  date: { type: Date, default: Date.now }
});
const Booking = mongoose.model("Booking", BookingSchema);

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email, password, role: role || "customer" }); 
    await newUser.save();
    res.json({ msg: "Signup success! Now login" });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed on server" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) 
      return res.status(400).json({ msg: "Invalid credentials" });

    res.json({ 
      msg: "Login success", 
      user: { name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
});

app.get("/api/hotels", async (req, res) => {
  const allHotels = await Hotel.find({});
  res.json(allHotels);
});

app.get("/api/hotels/:id/rooms", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (hotel) res.json(hotel.rooms); 
    else res.status(404).json({ msg: "Hotel not found" });
  } catch (err) {
    res.status(500).json({ msg: "Server error fetching rooms" });
  }
});

app.post("/api/owner/add-hotel", async (req, res) => {
  try {
    const { name, location, image, rooms, ownerEmail } = req.body;
    const newHotel = new Hotel({ name, location, image, rooms, ownerEmail });
    await newHotel.save();
    res.json({ msg: "Hotel listed successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add hotel" });
  }
});

app.post("/api/bookings/confirm", async (req, res) => {
  try {
    const { userEmail, hotelName, roomType, price, paymentMethod } = req.body;
    const newBooking = new Booking({
      userEmail,
      hotelName,
      roomType,
      price,
      paymentMethod
    });

    await newBooking.save();
    res.json({ msg: "Payment Successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Transaction failed on server" });
  }
});

app.get("/api/bookings/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching bookings" });
  }
});

app.get("/api/admin/payments", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    console.error("Admin Fetch Error:", err);
    res.status(500).json({ msg: "Error fetching master logs" });
  }
});

app.listen(5000, () => console.log("StaySmart Backend running on 5000"));  