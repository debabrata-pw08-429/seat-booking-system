const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  row: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  bookedBy: { type: String, default: null },
});

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
