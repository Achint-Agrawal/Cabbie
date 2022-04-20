import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { useRef, useState } from "react";


axios.defaults.withCredentials = true;
const vehicleTypes = [
  {
    id: 1,
    name: "Bike",
    image: "/motorcycle.jpeg",
    description: "Beat the traffic on a bike",
    fare: 10,
    factor:2
  },
  {
    id: 2,
    name: "Auto",
    image: "/auto.png",
    description: "Get pocket friendly autos at your doorstep",
    fare: 20,
    factor: 5
  },
  {
    id: 3,
    name: "Mini",
    image: "/smallcar.jpeg",
    description: "Comfy, economical cars",
    fare: 30,
    factor: 10
  },
  {
    id: 4,
    name: "Sedan",
    image: "/sedan.jpg",
    description: "Spacious sedans",
    fare: 40,
    factor:15
  },
];

export default function BookRideForm({
  onPickupLocation,
  onDropLocation,
  onDirectionsResponse,
  setRideID,
  rideDetails,
  setRideDetails
}) {

  const navigate = useNavigate();
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState();
  const [duration, setDuration] = useState("");
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [pickupName, setPickupName] = useState(null);
  const [dropName, setDropName] = useState(null);

  

  /**@type React.MutableObject<HTMLInputElement> */
  const originRef = useRef();
  /**@type React.MutableObject<HTMLInputElement> */
  const destinationRef = useRef();

  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);

  async function calculateRoute(pickupLocation, dropLocation) {
    // console.log(originRef, destinationRef);
    if (pickupLocation === null || dropLocation === null) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pickupLocation,
      destination: dropLocation,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    onDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [autoCompletePickup, setAutoCompletePickup] = useState(null);
  const [autoCompleteDrop, setAutoCompleteDrop] = useState(null);

  function onLoadPickup(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    setAutoCompletePickup(autocomplete);
  }
  function onLoadDrop(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    setAutoCompleteDrop(autocomplete);
  }

  function onPickupChanged() {
    // console.log(autoCompletePickup.getPlace().formatted_Name); // find Name string
    if (autoCompletePickup !== null) {
      const location = {
        lat: autoCompletePickup.getPlace().geometry.location.lat(),
        lng: autoCompletePickup.getPlace().geometry.location.lng(),
      };
      // console.log(location);
      setPickupName(autoCompletePickup.getPlace().formatted_address);
      setPickupLocation(location);
      onPickupLocation(location);
      calculateRoute(location, dropLocation);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  function onDropChanged() {
    if (autoCompleteDrop !== null) {
      const location = {
        lat: autoCompleteDrop.getPlace().geometry.location.lat(),
        lng: autoCompleteDrop.getPlace().geometry.location.lng(),
      };
      console.log(autoCompleteDrop.getPlace().formatted_address);
      setDropName(autoCompleteDrop.getPlace().formatted_address)
      setDropLocation(location);
      onDropLocation(location);
      calculateRoute(pickupLocation, location);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  function handleFormSubmission() {

    const payload = {
      pickupName, pickupLat: pickupLocation.lat, pickupLng: pickupLocation.lng, dropName, dropLat: dropLocation.lat, dropLng: dropLocation.lng, 
      fare: (vehicleTypes[activeVehicle].factor*parseFloat(distance.slice(0, -3))),
      vehicleType: vehicleTypes[activeVehicle].name,
    };

    console.log(payload);
    axios("/api/bookride", {
      method: "post",
      data: payload,
      withCredentials: true
    })    
    .then((res) => {
      console.log("res", res.data.rideID);
      // console.log("payload", payload);
      setRideID(res.data._id);
      console.log("ride details in booking form: ", res.data);
      setRideDetails(res.data);
      navigate('/trackride');
      
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // console.log(activeVehicle);
  return isLoaded ? (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ride Details
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Autocomplete onLoad={onLoadPickup} onPlaceChanged={onPickupChanged}>
          <TextField placeholder="Pick up Location" fullWidth ref={originRef} />
        </Autocomplete>
        <Autocomplete onLoad={onLoadDrop} onPlaceChanged={onDropChanged}>
          <TextField
            placeholder="Drop Location"
            fullWidth
            ref={destinationRef}
          />
        </Autocomplete>
      </Box>
      <List fullWidth>
        {vehicleTypes.map((vehicle, i) => (
          <ListItem>
            <Card
              onClick={() => {
                setActiveVehicle(i);
                console.log(parseFloat(distance.slice(0, -3)));
                console.log(vehicleTypes);
                console.log("active vehicle", activeVehicle);
                if(distance){
                  setFare(distance*vehicleTypes[i].factor)
                }
              }}
              style={
                i == activeVehicle ? { boxShadow: "0 0 3px 3px #1976d2" } : {}
              }
              sx={{ width: "100%", height: 150 }}
            >
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
                    {/* {
                      fare ? fare : 0 
                    } */}
                    {/* {fare && ("\u20B9" + distance)} */}
                    {distance && ("\u20B9"+(vehicleTypes[i].factor*parseFloat(distance.slice(0, -3))))}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </ListItem>
        ))}
      </List>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={calculateRoute}
        onClick={handleFormSubmission}
      >
        Book Ride
      </Button>
    </React.Fragment>
  ) : (
    <div>Loading...</div>
  );
}
