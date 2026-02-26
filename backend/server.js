const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors({ origin: "*" }));

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Import database
const db = require("./app/models");

// Connect to MongoDB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);

  });

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// 🔥 IMPORTANT: Register Tutorial Routes
require("./app/routes/tutorial.routes")(app);
// Set PORT
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});