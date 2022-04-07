import "./App.css";
import BookRideForm from "./components/BookRideForm";
import SignIn from "./components/SignIn";
import Map from "./components/Map";
import UpcomingRide from "./components/UpcomingRide";
import OngoingRide from "./components/OngoingRide";

function App() {
  return (
    <div className="App">
      <OngoingRide />
    </div>
  );
}

export default App;
