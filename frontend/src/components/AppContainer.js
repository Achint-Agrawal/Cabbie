import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookRideForm from "./BookRideForm";
import SignIn from "./SignIn";
import Map from "./Map";
import OngoingRide from "./OngoingRide";
import Payment from "./Payment";
import Grid from "@mui/material/Grid";
import SignUp from './SignUp';
import useToken from './useToken';
import Navbar from "./Navbar";
import HomePublic from "./HomePublic";

const step = 4;

const AppContainer = () => {

  const [token, setToken] = useToken();


  function getPanelContent(step) {
    switch (step) {
      case 0:
        return (
          <BookRideForm
            onPickupLocation={onPickupLocation}
            onDropLocation={onDropLocation}
            onDirectionsResponse={onDirectionsResponse}
          />
        );
      case 1:
        return <OngoingRide RideState={1} />;
      case 2:
        return <OngoingRide RideState={2} />;
      case 3:
        return <Payment />;
      case 4:
        return <SignUp />;
      default:
        throw new Error("Unknown step");
    }
  }
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  if (step != 4 && !token) {
    console.log(token);
    return <SignIn setToken={setToken} />
  }

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
            <Route exact path="/" element={<HomePublic />}></Route>
            <Route exact path="signup" element={<SignUp />}></Route>
            <Route exact path="signin" element={<SignIn />}></Route>
            <Route exact path="profile" element={<SignIn />}></Route>
            <Route exact path="pastrides" element={<BookRideForm />}></Route>
            <Route exact path="contact" element={<HomePublic />}></Route>
            <Route exact path="payment" element={<Payment />}></Route>
            <Route exact path="trackride" element={<OngoingRide />}></Route>
            <Route exact path="bookride" element={<BookRideForm />}></Route>
          </Routes>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AppContainer;
