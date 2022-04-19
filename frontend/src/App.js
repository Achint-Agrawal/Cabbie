import "./App.css";
import { useState, useEffect } from "react";
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
import DriverAppContainer from "./components/DriverAppContainer";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import useToken from "./components/useToken";
import CurrentLocation from "./components/CurrentLocaion";
import PastRides from "./components/PastRides";
import Profile from "./components/Profile";
import DriverProfile from "./components/DriverProfile";

function App() {
    const [token, setToken] = useToken();
    const [rideID, setRideID] = useState();
    const [userType, setUserType] = useState(0);
    const [rideDetails, setRideDetails] = useState();
    const [riderId, setRiderId] = useState(null);
    const [driverId, setDriverId] = useState(null);

    useEffect(() => {
        setUserType(localStorage.getItem("userType"))
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                {!userType || userType === "0" ? (
                    <AppContainer
                        setUserType={setUserType}
                        token={token}
                        setToken={setToken}
                        setRideID={setRideID}
                        rideID={rideID}
                    />
                ) : (
                    <DriverAppContainer
                        setUserType={setUserType}
                        token={token}
                        setToken={setToken}
                        setRideID={setRideID}
                        rideID={rideID}
                        riderId={riderId}
                        setRiderId={setRiderId}
                    />
                )}
                {/* <CurrentLocation /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
