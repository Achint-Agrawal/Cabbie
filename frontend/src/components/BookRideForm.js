import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const vehicleTypes = [
  {
    name: "Bike",
    image: "/motorcycle.png",
    description: "meow",
    fare: 10,
  },
  {
    name: "Bike2",
    image: "/motorcycle.png",
    description: "meow2",
    fare: 20,
  },
  {
    name: "Bike3",
    image: "/motorcycle.png",
    description: "meow3",
    fare: 30,
  },
  {
    name: "Bike4",
    image: "/motorcycle.png",
    description: "meow4",
    fare: 40,
  },
];

export default function BookRideForm() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  return isLoaded ? (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ride Details
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Autocomplete>
          <TextField fullWidth>
            <Input
              margin="normal"
              required
              fullWidth
              id="PickUp"
              label="Pick up Location"
              name="PickUp"
              autoFocus
            />
          </TextField>
        </Autocomplete>
        <Autocomplete>
          <TextField fullWidth>
            <Input
              margin="normal"
              required
              fullWidth
              id="Drop"
              label="Drop Location"
              name="Drop"
            />
          </TextField>
        </Autocomplete>
      </Box>
      <List fullWidth>
        {vehicleTypes.map((vehicle) => (
          <ListItem>
            <Card sx={{ width: "100%", height: 150 }}>
              <Grid container spacing={2} paddingRight={2} sx={12}>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={vehicle.image}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{vehicle.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.description}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <br />
                  <Typography align="right" variant="h6">
                    {"5 min away"}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Book Ride
      </Button>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
}
