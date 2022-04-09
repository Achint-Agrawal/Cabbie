import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const customer = {
  name: "Daljit Singh",
  image: "/Daljit.jpg",
  rating: 4.8,
  carType: "Tesla Model S",
  license: "UP42 SX 6969",
  phoneno: "6969696969",
};

const fare = 69;

export default function DriverPayment() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ride Completed!!
      </Typography>

      <Card sx={{ width: "100%", height: 200 }}>
        <br />
        <Typography>Please collect</Typography>
        <br />
        <Typography variant="h2" fontWeight="Bold">
          {"\u20B9" + fare}
        </Typography>
        <br />
        <Typography>{"from " + customer.name}</Typography>
      </Card>

      <Button variant="contained" sx={{ margin: 2 }}>
        Payment Recieved
      </Button>
      <br />

      <Card sx={{ width: "100%", height: 250 }}>
        <Grid container spacing={2} sx={12}>
          <Grid item xs={4}>
            <CardMedia component="img" height="250" image={customer.image} />
          </Grid>
          <Grid item xs={8}>
            <br />
            <br />
            <Typography align="center" variant="h5">
              {"Rate your experience with " + customer.name}
            </Typography>
            <div align="center">
              <br />
              <br />
              <Rating precision={0.5} size="large" />
              <br />
            </div>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
