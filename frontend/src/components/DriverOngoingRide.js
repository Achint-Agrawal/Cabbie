import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";

const user = {
  name: "Daljit Singh",
  image: "/Daljit.png",
  rating: 2.1,
  phoneno: "7888817907",
  pickup: "IIT Kanpur, Hall 9",
  drop: "Kanpur Central",
};

export default function DriverOngoingRide({ RideState }) {
  return (
    <React.Fragment>
      {RideState == 1 ? (
        <Typography variant="h6" gutterBottom>
          Customer Details
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom>
          Ride Started
        </Typography>
      )}
      <Card sx={{ width: "100%", height: 250 }}>
        <Grid container spacing={2} sx={12}>
          <Grid item xs={4}>
            <CardMedia component="img" height="250" image={user.image} />
          </Grid>
          <Grid item xs={6}>
            <Typography align="left" variant="h5">
              {user.name}
            </Typography>
            <div align="left">
              <Rating readOnly="true" value={user.rating} precision={0.1} />
              <Typography color="#fcba03">{user.rating}</Typography>
              <br />
              <Typography display="inline" fontWeight={"bold"}>
                {"Pickup: "}
              </Typography>
              <Typography display="inline">{user.pickup}</Typography>
              <br />
              <Typography display="inline" fontWeight={"bold"}>
                {"Drop: "}
              </Typography>
              <Typography display="inline">{user.drop}</Typography>{" "}
            </div>
          </Grid>
          <Grid item xs={2}>
            <br />
            {RideState == 1 && (
              <Typography align="right" variant="h6">
                {"<1 min away"}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
      {RideState == 1 && (
        <div>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <a id="call" href={"tel:" + user.phoneno}>
              Call Customer
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
