const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ msg: "Password too short" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }
  const newUser = new User({ name, email, password });
  await newUser.save();

  res.json({ msg: "Signup success! Now login" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email & password required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  res.json({
    msg: "Login success",
    name: user.name,
    email: user.email
  });
});

module.exports = router;
