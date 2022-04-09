import "./App.css";
import BookRideForm from "./components/BookRideForm";
import SignIn from "./components/SignIn";
import Map from "./components/Map";
import OngoingRide from "./components/OngoingRide";
import Payment from "./components/Payment";
import AppContainer from "./components/AppContainer";
import DriverSignIn from "./components/DriverSignIn";
import DriverSignUp from "./components/DriverSignUp";
import DriverOngoingRide from "./components/DriverOngoingRide";

function App() {
  return (
    <div className="App">
      <DriverOngoingRide RideState={1} />
    </div>
  );
}

export default App;
