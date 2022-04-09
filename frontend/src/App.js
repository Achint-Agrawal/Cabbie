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
import DriverRideRequest from "./components/DriverRideRequest";
import DriverPayment from "./components/DriverPayment";

function App() {
  return (
    <div className="App">
      <DriverPayment RideState={1} />
    </div>
  );
}

export default App;
