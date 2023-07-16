const Seat = require("../models/seat.model");

const generateSeatData = async () => {
  try {
    await Seat.deleteMany();

    const seats = [];
    let seatNumber = 1;
    let totalRows = Math.floor(80 / 7);
    let lastRow = Math.floor(80 % 7);

    for (let i = 1; i <= totalRows; i++) {
      for (let j = 1; j <= 7; j++) {
        const seat = new Seat({
          number: seatNumber.toString(),
          row: i,
        });

        seats.push(seat);
        seatNumber++;
      }
    }

    for (let j = 1; j <= lastRow; j++) {
      const seat = new Seat({
        number: seatNumber,
        row: totalRows + 1,
      });

      seats.push(seat);
      seatNumber++;
    }

    await Seat.insertMany(seats);
    console.log("Seat data generated successfully");
  } catch (error) {
    console.error("Error generating seat data:", error);
  }
};

module.exports = generateSeatData;
