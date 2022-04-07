import "./App.css";
import BookRideForm from "./components/BookRideForm";
import SignIn from "./components/SignIn";
import Map from "./components/Map";
import UpcomingRide from "./components/UpcomingRide";
import OngoingRide from "./components/OngoingRide";
import Payment from "./components/Payment";

function App() {
  return (
    <div className="App">
      <Payment />
    </div>
  );
}

export default App;
