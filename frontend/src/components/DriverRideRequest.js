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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

// const vehicleType = localStorage.getItem("vehicleType");

export default function DriverRideRequest({
    onSelectCustomer,
    rideId,
    riderId,
    setRideId,
    setRiderId,
}) {
    const [loadedResponse, setLoadedResponse] = useState(false);
    const [rideRequests, setRideRequests] = useState(null);
    const [lat, setLat] = useState(26.5123);
    const [lng, setLng] = useState(80.2329);
    const navigate = useNavigate();

    function acceptRide(rideId, riderId) {
        axios
            .patch("api/driver/acceptRide", {
                rideId: rideId,
            })
            .then((res) => {
                console.log("acceptRide", res.data);
                setRideId(rideId);
                setRiderId(riderId);
                navigate("/driver/trackride");
            })
            .catch((err) => {
                console.log("acceptRide", err);
            });
    }

    function updateLatLng() {
        console.log("Updating Current location...");
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            },
            function (err) {
                console.log(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
            }
        );
    }

    function checkRideRequests() {
        console.log("checkRideRequests");
        if (window.location.pathname != "/") {
            console.log("checkRideRequests - returning");
            return;
        }

        //Uncomment below function call to use current location instead of saved location
        // updateLatLng();

        axios
            .get("/api/driver/getRequestsForDriver", {
                params: {
                    lat: lat,
                    lng: lng,
                    vehicleType: localStorage.getItem("vehicleType"),
                },
            })
            .then((res) => {
                console.log(res.data);
                setLoadedResponse(true);
                setRideRequests(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(checkRideRequests, 5000);
    }

    useEffect(() => {
        checkRideRequests();
    }, []);

    const [activeCustomer, setActiveCustomer] = useState(null);
    return (
        <React.Fragment>
            {rideRequests != null && rideRequests.length != 0 && (
                <Typography variant="h6" gutterBottom>
                    Ride Requests
                </Typography>
            )}
            {(rideRequests == null || rideRequests.length == 0) && (
                <Typography variant="h6" gutterBottom>
                    Waiting for Ride Requests...
                </Typography>
            )}
            {/* {rideId != null && (
                <Typography variant="h6" gutterBottom>
                    Waiting for Ride Requests...
                </Typography>
            )} */}
            <List fullWidth>
                {rideRequests != null &&
                    rideRequests.map((ride, i) => (
                        <ListItem>
                            <Card
                                onClick={() => {
                                    onSelectCustomer(
                                        {
                                            lat: ride.pickupLat,
                                            lng: ride.pickupLng,
                                        },
                                        { lat: ride.dropLat, lng: ride.dropLng }
                                    );
                                    setActiveCustomer(i);
                                }}
                                style={
                                    i == activeCustomer
                                        ? { boxShadow: "0 0 3px 3px #1976d2" }
                                        : {}
                                }
                                sx={{ width: "100%", height: 250 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={ride.riderImage}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs={9}>
                                            <Typography
                                                align="left"
                                                variant="h5"
                                            >
                                                {ride.riderName}
                                            </Typography>
                                            <div align="left">
                                                <Rating
                                                    readOnly="true"
                                                    value={ride.rating}
                                                    precision={0.1}
                                                />
                                                <Typography color="#fcba03">
                                                    {ride.rating}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    display="inline"
                                                    fontWeight={"bold"}
                                                >
                                                    {"Pickup: "}
                                                </Typography>
                                                <Typography display="inline">
                                                    {ride.pickupName}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    display="inline"
                                                    fontWeight={"bold"}
                                                >
                                                    {"Drop: "}
                                                </Typography>
                                                <Typography display="inline">
                                                    {ride.dropName}
                                                </Typography>{" "}
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <br />
                                            <Typography
                                                align="right"
                                                variant="h6"
                                            >
                                                {"\u20B9" + ride.fare}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        acceptRide(
                                                            rideRequests[i]._id,
                                                            rideRequests[i]
                                                                .userID
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </Button>
                                                {/* <Button size="small">Decline</Button> */}
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
