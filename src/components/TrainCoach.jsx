import { useEffect, useState } from "react";
import "../coach.css";

const url = import.meta.env.VITE_SOME_backendURL + "/seats";

console.log(url);
const TrainCoach = () => {
  // State variables
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error.message);
        setData([]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Configuration for seats in each row
  const seatsInRow = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3]; // Number of seats in each row
  const totalRows = seatsInRow.length;

  const renderSeats = () => {
    let seatNumber = 1;
    const seats = [];

    // Render seats for each row
    for (let row = 0; row < totalRows; row++) {
      const rowSeats = [];
      const totalSeats = seatsInRow[row];

      // Render individual seats
      for (let seat = 1; seat <= totalSeats; seat++) {
        const seatData = data.find((e) => e.number === seatNumber);

        if (seatData?.isAvailable) {
          // Render available seat
          rowSeats.push(
            <div key={seatNumber} className="seat seat-available">
              {seatNumber}
            </div>
          );
        } else {
          // Render unavailable seat
          rowSeats.push(
            <div key={seatNumber} className="seat seat-unavailable">
              {seatNumber}
            </div>
          );
        }

        seatNumber++;
      }

      // Render row
      seats.push(
        <div key={row} className="row">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  // Render the train coach with seats
  return <div className="train-coach">{renderSeats()}</div>;
};

export default TrainCoach;
