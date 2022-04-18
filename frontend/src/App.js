import "./App.css";
import { useState } from 'react';
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
import CurrentLocation from "./components/CurrentLocaion";


function App() {
    const [token, setToken] = useState();
    const [userType, setUserType] = useState(0);

    return (
        <div className="App">
            <BrowserRouter>
                {userType === 0 ? <AppContainer setUserType={setUserType} token={token} setToken={setToken}/> : <DriverAppContainer setUserType={setUserType} token={token} setToken={setToken}/> }
                {/* <CurrentLocation /> */}
            </BrowserRouter>

            {/* <CurrentLocation /> */}
        </div>
    );
}

export default App;
