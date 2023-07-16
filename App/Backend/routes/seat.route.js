const express = require("express");
const router = express.Router();
const { reserveSeats, getAllSeats } = require("../controllers/seat.controller");

router.get("/seats", async (req, res) => {
  try {
    const seats = await getAllSeats();
    res.json(seats);
  } catch (error) {
    console.error("Error retrieving seats:", error);
    res
      .status(500)
      .json({ error: "Internal server error - Error retrieving seats" });
  }
});

router.post("/seats/reserve", async (req, res) => {
  const { seats } = req.body;
  try {
    const seatsBooked = await reserveSeats(seats);
    res.json(seatsBooked);
  } catch (error) {
    console.error("Error reserving seats:", error);
    res
      .status(500)
      .json({ error: "Internal server error - Error reserving seats" });
  }
});

module.exports = router;
