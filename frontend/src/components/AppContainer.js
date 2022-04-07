import React from "react";
import BookRideForm from "./BookRideForm";
import SignIn from "./SignIn";
import Map from "./Map";
import OngoingRide from "./OngoingRide";
import Payment from "./Payment";
import Grid from "@mui/material/Grid";

const step = 3;

function getPanelContent(step) {
  switch (step) {
    case 0:
      return <BookRideForm />;
    case 1:
      return <OngoingRide RideState={1} />;
    case 2:
      return <OngoingRide RideState={2} />;
    case 3:
      return <Payment />;
    default:
      throw new Error("Unknown step");
  }
}

const AppContainer = () => {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={2}
        padding={2}
        style={{ display: "flex", height: "100vh" }}
      >
        <Grid item xs={6}>
          <Map />
        </Grid>
        <Grid item xs={12} md={6} minWidth={400}>
          {getPanelContent(step)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AppContainer;
