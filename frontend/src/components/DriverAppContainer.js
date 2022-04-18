import React, { useState } from "react";
import {Route, Routes} from 'react-router-dom';
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

const step = 3;

const DriverAppContainer = ({setUserType, token, setToken}) => {
  function getPanelContent(step) {
    switch (step) {
      case 0:
        return <DriverRideRequest onSelectCustomer={onSelectCustomer} />;
      case 1:
        return <DriverOngoingRide RideState={1} />;
      case 2:
        return <DriverOngoingRide RideState={2} />;
      case 3:
        return <DriverPayment />;
      default:
        throw new Error("Unknown step");
    }
  }
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [activeCustomerRoute, setActiveCustomerRoute] = useState(null);

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
  function onSelectCustomer(pickup, drop) {
    setPickup(pickup);
    setDrop(drop);
    console.log(pickup, drop);
  }
  return (
    <React.Fragment>
      {/* pass setToken in order to logout*/}
      <DriverNavbar setToken={setToken} token={token}></DriverNavbar>
      <Grid
        container
        spacing={2}
        padding={2}
        style={{ display: "flex", height: "100vh" }}
      >
        <Grid item xs={6}>
          <DriverMap pickup={pickup} drop={drop} />
        </Grid>
        <Grid item xs={12} md={6} minWidth={400}>
          <Routes>
            <Route
              exact
              path="/"
              element={!token ? <HomePublic /> : <HomePrivate />}
            ></Route>
            <Route
              exact
              path="/driver/signup"
              element={<DriverSignUp />}
            ></Route>
            {/* <Route
              exact
              path="signin"
              element={<SignIn setToken={setToken} setUserType={setUserType} />}
            ></Route> */}

            <Route
              exact
              path="/driver/signin"
              element={<DriverSignIn setToken={setToken} setUserType={setUserType} />}
            ></Route>
            <Route
              exact
              path="profile"
              element={
                !token ? (
                  <HomePublic />
                ) : (
                  <SignIn setToken={setToken} />
                )
              }
            ></Route>
            <Route
              exact
              path="pastrides"
              element={!token ? <HomePublic /> : <BookRideForm />}
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
