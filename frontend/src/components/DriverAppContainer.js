import React, { useState } from "react";
import BookRideForm from "./BookRideForm";
import DriverRideRequest from "./DriverRideRequest";
import DriverOngoingRide from "./DriverOngoingRide";
import DriverPayment from "./DriverPayment";
import DriverMap from "./DriverMap";

import Map from "./Map";
import OngoingRide from "./OngoingRide";
import Payment from "./Payment";
import Grid from "@mui/material/Grid";

const step = 3;

const DriverAppContainer = () => {
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
          {getPanelContent(step)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DriverAppContainer;
