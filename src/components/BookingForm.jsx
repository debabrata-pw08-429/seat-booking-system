import "../styles/bookingform.css";
import { useEffect, useState } from "react";

const reservationURL = import.meta.env.VITE_SOME_backendURL + "/seats/reserve";
const resetURL = import.meta.env.VITE_SOME_backendURL + "/seats/reset";

const BookingForm = () => {
  // State variables
  const [reserve, setReserve] = useState(0); // Number of seats to reserve
  const [postSeatData, setpostSeatData] = useState({}); // Data to be sent in POST request
  const [response, setResponse] = useState([]); // Response data from server
  const [error, setError] = useState(null); // Error state

  console.log(response);

  useEffect(() => {
    // Function to post seat reservation data
    const postData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postSeatData),
        };

        const responseJSON = await fetch(reservationURL, requestOptions);
        const responseData = await responseJSON.json();

        setResponse(responseData);
      } catch (error) {
        setError(error);
      }
    };

    postData();
  }, [postSeatData]);

  // Handle seat reservation form submission
  const handleSeatReservation = (e) => {
    e.preventDefault();
    setpostSeatData({ seats: reserve });
    window.location.reload();
  };

  // Handle reset button click
  const handleReset = async () => {
    await fetch(resetURL);
    window.location.reload();
  };

  // Handle number input change
  const handleNumberInputChange = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 1 && value <= 7) {
      setReserve(value);
    } else {
      setReserve(null);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="booking-form">
      <h3>Note: One person can reserve up to 7 seats at a time. </h3>
      <form onSubmit={handleSeatReservation}>
        <label>
          Enter a number:
          <input
            type="number"
            id="numberInput"
            name="numberInput"
            min="1"
            max="7"
            required
            onChange={handleNumberInputChange}
          />
        </label>

        <button onClick={handleReset}>Reset</button>

        <button type="submit" disabled={!reserve}>
          Checkout
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
