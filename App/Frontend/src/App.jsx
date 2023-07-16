import "./index.css";
import BookingForm from "./components/BookingForm";
import TrainCoach from "./components/TrainCoach";

function App() {
  return (
    <>
      <h1>Train Seating Arrangement</h1>
      <div className="parentContainer">
        <TrainCoach />
        <BookingForm />
      </div>
    </>
  );
}

export default App;
