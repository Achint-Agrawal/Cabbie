import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";

const driver = {
  name: "Daljit Singh",
  image: "/Daljit.png",
  rating: 4.8,
  carType: "Tesla Model S",
  license: "UP42 SX 6969",
  phoneno: "7888817907",
};

export default function OngoingRide({ RideState }) {
  return (
    <React.Fragment>
      {RideState == 1 ? (
        <Typography variant="h6" gutterBottom>
          Driver Details
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom>
          Ride Started
        </Typography>
      )}
      <Card sx={{ width: "100%", height: 250 }}>
        <Grid container spacing={2} sx={12}>
          <Grid item xs={4}>
            <CardMedia component="img" height="250" image={driver.image} />
          </Grid>
          <Grid item xs={4}>
            <Typography align="left" variant="h5">
              {driver.name}
            </Typography>
            <div align="left">
              <Rating readOnly="true" value={driver.rating} precision={0.1} />
              <Typography color="#fcba03">{driver.rating}</Typography>
              <br />
              <Typography>{driver.carType}</Typography>
              <Typography fontWeight="Bold">{driver.license}</Typography>
            </div>
          </Grid>
          <Grid item xs={4}>
            <br />
            {RideState == 1 && (
              <Typography align="right" variant="h6">
                {"5 min away"}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
      {RideState == 1 && (
        <div>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <a id="calldriver" href={"tel:" + driver.phoneno}>
              Call Driver
            </a>
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel Ride
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
