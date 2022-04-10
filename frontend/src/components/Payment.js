import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";

const driver = {
  name: "Daljit Singh",
  image: "/Daljit.png",
  rating: 4.8,
  carType: "Tesla Model S",
  license: "UP42 SX 6969",
  phoneno: "6969696969",
};

const fare = 69;

export default function Payment() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ride Completed!!
      </Typography>

      <Card sx={{ width: "100%", height: 200 }}>
        <br />
        <Typography>Please pay</Typography>
        <br />
        <Typography variant="h2" fontWeight="Bold">
          {"\u20B9" + fare}
        </Typography>
        <br />
        <Typography>to your driver</Typography>
      </Card>

      <br />

      <Card sx={{ width: "100%", height: 250 }}>
        <Grid container spacing={2} sx={12}>
          <Grid item xs={4}>
            <CardMedia component="img" height="250" image={driver.image} />
          </Grid>
          <Grid item xs={8}>
            <br />
            <Typography align="center" variant="h5">
              {"Rate your experience with " + driver.name}
            </Typography>
            <div align="center">
              <Rating precision={0.5} size="large" />
              <br />
              <TextField
                fullWidth
                id="AddReview"
                label="Add a Review"
                variant="outlined"
                minRows={4}
                multiline
              />
            </div>
          </Grid>
        </Grid>
      </Card>
    </React.Fragment>
  );
}
