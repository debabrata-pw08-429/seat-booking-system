// Import dependencies_
const express = require("express");
const CONNECT = require("./configs/db");
const cors = require("cors");
require("dotenv").config();
const seatRoutes = require("./routes/seat.route");
const generateSeatData = require("./configs/generateSeats");

// Use Middlewares_
const app = express();
app.use(express.json());
app.use(cors());
app.use(seatRoutes);

// Test routes_
app.get("/", (req, res) => {
  res.send("Server is Working Fine Debo!");
});

app.get("/seats/reset", async (req, res) => {
  await generateSeatData();
  res.send("All seats are reset!");
});

// CONNECT Database & LISTEN_
const port = process.env.PORT || 5000;
CONNECT()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    // Handle the error or terminate the application gracefully
    console.error("Failed to connect to the database:", error);
  });
