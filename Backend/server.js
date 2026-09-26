const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  users.push({ username, email, password });
  return res.json({ success: true, message: "User created successfully" });
});

app.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    return res.json({ success: true, username: foundUser.username });
  }
  return res.json({ success: false, message: "Invalid credentials" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});