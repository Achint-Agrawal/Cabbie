import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BookRideForm from "./BookRideForm";
import DriverRideRequest from "./DriverRideRequest";
import DriverOngoingRide from "./DriverOngoingRide";
import DriverPayment from "./DriverPayment";
import DriverMap from "./DriverMap";
import DriverNavbar from "./DriverNavbar";
import HomePublic from "./HomePublic";
import HomePrivate from "./HomePrivate";
import Grid from "@mui/material/Grid";
import DriverSignUp from "./DriverSignUp";
import DriverSignIn from "./DriverSignIn";
import SignIn from "./SignIn";
import Payment from "./Payment";
import OngoingRide from "./OngoingRide";
import DriverPastRides from "./DriverPastRides";
import DriverProfile from "./DriverProfile";

const step = 3;

const DriverAppContainer = ({
    setUserType,
    token,
    setToken,
    setRideID,
    rideID,
    riderId,
    setRiderId,
}) => {
    let map;

    // if (token) {
    //   map = <Grid item xs={6}>
    //     <DriverMap pickup={pickup} drop={drop} />
    //   </Grid>
    // }
    const [pickup, setPickup] = useState(null);
    const [drop, setDrop] = useState(null);
    // const [directionsResponse, setDirectionsResponse] = useState(null);
    // const [activeCustomerRoute, setActiveCustomerRoute] = useState(null);

    // function onPickupLocation(location) {
    //     setPickup(location);
    // }
    // function onDropLocation(location) {
    //     setDrop(location);
    // }
    // function onDirectionsResponse(directionsResponse) {
    //     console.log(directionsResponse);
    //     setDirectionsResponse(directionsResponse);
    // }
    function onSelectCustomer(pickup, drop) {
        setPickup(pickup);
        setDrop(drop);
        console.log(pickup, drop);
    }
    return (
        <React.Fragment>
            {/* pass setToken in order to logout*/}
            <DriverNavbar
                setToken={setToken}
                token={token}
                setUserType={setUserType}
            ></DriverNavbar>
            <Grid
                container
                spacing={2}
                padding={2}
                style={{ display: "flex", height: "100vh" }}
            >
                {token && <Grid item xs={6}>
                    <DriverMap pickup={pickup} drop={drop} /> 
                </Grid>
                }
                <Grid item xs={12} md={token ? 6 : 12} minWidth={400}>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                !token ? (
                                    <HomePublic />
                                ) : (
                                    <DriverRideRequest
                                        onSelectCustomer={onSelectCustomer}
                                        setRideID={setRideID}
                                        setRiderId={setRiderId}
                                    />
                                )
                            }
                        ></Route>
                        <Route
                            exact
                            path="/driver/signup"
                            element={<DriverSignUp />}
                        ></Route>
                        <Route
                            exact
                            path="/driver/signin"
                            element={
                                <DriverSignIn
                                    setToken={setToken}
                                    setUserType={setUserType}
                                />
                            }
                        ></Route>
                        <Route
                            exact
                            path="/driver/profile"
                            element={
                                !token ? <HomePublic /> : <DriverProfile />
                            }
                        ></Route>
                        <Route
                            exact
                            path="driver/pastrides"
                            element={
                                !token ? <HomePublic /> : <DriverPastRides />
                            }
                        ></Route>
                        <Route
                            exact
                            path="contact"
                            element={!token ? <HomePublic /> : <HomePublic />}
                        ></Route>
                        <Route
                            exact
                            path="/driver/payment"
                            element={
                                !token ? (
                                    <HomePublic />
                                ) : (
                                    <DriverPayment
                                        rideId={rideID}
                                        riderId={riderId}
                                    />
                                )
                            }
                        ></Route>
                        <Route
                            exact
                            path="/driver/trackride"
                            element={
                                !token ? (
                                    <HomePublic />
                                ) : (
                                    <DriverOngoingRide
                                        RideState={1}
                                        rideId={rideID}
                                        riderId={riderId}
                                        setRideId={setRideID}
                                        setRiderId={setRiderId}
                                    />
                                )
                            }
                        ></Route>
                        {/* <Route
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
            ></Route> */}
                    </Routes>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default DriverAppContainer;
