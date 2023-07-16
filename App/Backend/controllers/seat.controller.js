const Seat = require("../models/seat.model");

// Breaking Down the logic :-
// Are there required number of seats available in the 1st row_
// If not check for 2nd row and so on_
// If non of the consecutive seats are available per row, then check for closed nearby seats_

async function getAllSeats() {
  const seats = await Seat.find();
  return seats;
}

async function reserveSeats(req_Seats) {
  const reservedSeats = [];
  let currentRow = 1;
  let totalRows = 12;
  let availableSeats = [];

  while (currentRow <= totalRows) {
    availableSeats = await Seat.find({
      row: currentRow,
      isAvailable: true,
    })
      .sort({ number: 1 })
      .limit(req_Seats);

    if (availableSeats.length >= req_Seats) {
      let updatedDocument;

      for (let i = 0; i < req_Seats; i++) {
        updatedDocument = await Seat.findOneAndUpdate(
          { number: availableSeats[i].number, isAvailable: true },
          { isAvailable: false, bookedBy: "user" },
          { new: true }
        );

        await updatedDocument.save();
        reservedSeats.push(updatedDocument);
      }

      break;
    } else {
      currentRow++;
    }
  }

  return reservedSeats;
}

module.exports = { reserveSeats, getAllSeats };
