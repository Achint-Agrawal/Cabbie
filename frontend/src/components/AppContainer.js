import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookRideForm from "./BookRideForm";
import SignIn from "./SignIn";
import Map from "./Map";
import OngoingRide from "./OngoingRide";
import Payment from "./Payment";
import Grid from "@mui/material/Grid";
import SignUp from "./SignUp";
import useToken from "./useToken";
import Navbar from "./Navbar";
import HomePublic from "./HomePublic";
import DriverSignUp from "./DriverSignUp";
import HomePrivate from "./HomePrivate";
import PastRides from "./PastRides";
import Profile from "./Profile";

// const step = 3;

const AppContainer = () => {
    const [token, setToken] = useToken();

    const [pickup, setPickup] = useState(null);
    const [drop, setDrop] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);

    // if (step != 4 && !token) {
    //   console.log(token);
    //   return <SignIn setToken={setToken} />
    // }

    function onPickupLocation(location) {
        setPickup(location);
    }
    function onDropLocation(location) {
        setDrop(location);
    }
    function onDirectionsResponse(directionsResponse) {
        console.log(directionsResponse);
        setDirectionsResponse(directionsResponse);
    }
    return (
        <React.Fragment>
            <Grid
                container
                spacing={2}
                padding={2}
                style={{ display: "flex", height: "100vh" }}
            >
                <Grid item xs={6}>
                    <Map
                        pickup={pickup}
                        drop={drop}
                        directionsResponse={directionsResponse}
                    />
                </Grid>
                <Grid item xs={12} md={6} minWidth={400}>
                    <Navbar setToken={setToken}></Navbar>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={!token ? <HomePublic /> : <HomePrivate />}
                        ></Route>
                        <Route exact path="signup" element={<SignUp />}></Route>
                        <Route
                            exact
                            path="/driver/signup"
                            element={<DriverSignUp />}
                        ></Route>
                        <Route
                            exact
                            path="signin"
                            element={<SignIn setToken={setToken} />}
                        ></Route>
                        <Route
                            exact
                            path="profile"
                            element={!token ? <HomePublic /> : <Profile />}
                        ></Route>
                        <Route
                            exact
                            path="contact"
                            element={!token ? <HomePublic /> : <HomePublic />}
                        ></Route>
                        <Route
                            exact
                            path="payment"
                            element={!token ? <HomePublic /> : <Payment />}
                        ></Route>
                        <Route
                            exact
                            path="trackride"
                            element={!token ? <HomePublic /> : <OngoingRide />}
                        ></Route>
                        <Route
                            exact
                            path="pastrides"
                            element={!token ? <HomePublic /> : <PastRides />}
                        ></Route>
                        <Route
                            exact
                            path="bookride"
                            element={
                                !token ? (
                                    <HomePublic />
                                ) : (
                                    <BookRideForm
                                        onPickupLocation={onPickupLocation}
                                        onDropLocation={onDropLocation}
                                        onDirectionsResponse={
                                            onDirectionsResponse
                                        }
                                    />
                                )
                            }
                        ></Route>
                    </Routes>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default AppContainer;
