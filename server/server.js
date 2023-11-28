// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registrationForm", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Handle registration form submissions
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const registration = new Registration({
      firstName,
      lastName,
      email,
      password,
    });
    await registration.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
