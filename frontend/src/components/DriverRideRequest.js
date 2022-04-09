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

const rideRequests = [
  {
    id: 1,
    name: "Daljit Singh",
    image: "/Daljit.jpg",
    rating: 2.1,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 9",
    drop: "Kanpur Central",
  },
  {
    id: 2,
    name: "Daljit Singh2",
    image: "/Daljit.jpg",
    rating: 2.1,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 9",
    drop: "Kanpur Central",
  },
  {
    id: 3,
    name: "Daljit Singh3",
    image: "/Daljit.jpg",
    rating: 2.1,
    phoneno: "7888817907",
    pickup: "IIT Kanpur, Hall 9",
    drop: "Kanpur Central",
  },
];

export default function DriverRideRequest() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>

      <List fullWidth>
        {rideRequests.map((ride, i) => (
          <ListItem>
            <Card sx={{ width: "100%", height: 250 }}>
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
                      {"<1 min away"}
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
