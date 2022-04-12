import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";

const rideRequests = [
  {
    id: 1,
    name: "Kaustubh Pawar",
    image: "/Kaustubh.png",
    rating: 4.8,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 9",
    drop: "NH91, Kanpur",
    pickupLatLng: { lat: 26.456, lng: 80.3319 },
    dropLatLng: { lat: 24.075, lng: 80.3319 },
  },
  {
    id: 2,
    name: "Priydarshi Singh",
    image: "/Priydarshi.png",
    rating: 1.2,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 9",
    drop: "Kanpur Central",
    pickupLatLng: { lat: 26.5123, lng: 80.2329 },
    dropLatLng: { lat: 26.4537, lng: 80.3513 },
  },
  {
    id: 3,
    name: "Pruthviraj Desai",
    image: "/Pruthvi.png",
    rating: 4.3,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 1",
    drop: "Lucknow Airport",
    pickupLatLng: { lat: 26.5123, lng: 80.2329 },
    dropLatLng: { lat: 24.075, lng: 82.3319 },
  },
];

export default function DriverRideRequest({ onSelectCustomer }) {
  const [activeCustomer, setActiveCustomer] = useState(null);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>

      <List fullWidth>
        {rideRequests.map((ride, i) => (
          <ListItem>
            <Card
              onClick={() => {
                onSelectCustomer(
                  rideRequests[i].pickupLatLng,
                  rideRequests[i].dropLatLng
                );
                setActiveCustomer(i);
              }}
              style={
                i == activeCustomer ? { boxShadow: "0 0 3px 3px #1976d2" } : {}
              }
              sx={{ width: "100%", height: 250 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CardMedia component="img" height="250" image={ride.image} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs={9}>
                    <Typography align="left" variant="h5">
                      {ride.name}
                    </Typography>
                    <div align="left">
                      <Rating
                        readOnly="true"
                        value={ride.rating}
                        precision={0.1}
                      />
                      <Typography color="#fcba03">{ride.rating}</Typography>
                      <br />
                      <Typography display="inline" fontWeight={"bold"}>
                        {"Pickup: "}
                      </Typography>
                      <Typography display="inline">{ride.pickup}</Typography>
                      <br />
                      <Typography display="inline" fontWeight={"bold"}>
                        {"Drop: "}
                      </Typography>
                      <Typography display="inline">{ride.drop}</Typography>{" "}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <br />
                    <Typography align="right" variant="h6">
                      {"5 min away"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions>
                      <Button size="small">Accept</Button>
                      <Button size="small">Decline</Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
