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

axios.defaults.withCredentials = true;

// const riderId = "625972c5258ca778038d179e";

// const rideRequests = [
//     {
//         id: 1,
//         name: "Kaustubh Pawar",
//         image: "/Kaustubh.png",
//         rating: 4.8,
//         phoneno: "7888817907",
//         pickupName: "IIT Kanpur, Hall 9",
//         dropName: "NH91, Kanpur",
//         pickupLatLng: { lat: 26.456, lng: 80.3319 },
//         dropLatLng: { lat: 24.075, lng: 80.3319 },
//     },
//     {
//         id: 2,
//         name: "Priydarshi Singh",
//         image: "/Priydarshi.png",
//         rating: 1.2,
//         phoneno: "7888817907",
//         pickupName: "IIT Kanpur, Hall 9",
//         dropName: "Kanpur Central",
//         pickupLatLng: { lat: 26.5123, lng: 80.2329 },
//         dropLatLng: { lat: 26.4537, lng: 80.3513 },
//     },
//     {
//         id: 3,
//         name: "Pruthviraj Desai",
//         image: "/Pruthvi.png",
//         rating: 4.3,
//         phoneno: "7888817907",
//         pickupName: "IIT Kanpur, Hall 1",
//         dropName: "Lucknow Airport",
//         pickupLatLng: { lat: 26.5123, lng: 80.2329 },
//         dropLatLng: { lat: 24.075, lng: 82.3319 },
//     },
// ];

const lat = 26.5123;
const lng = 80.2329;
const vehicleType = "Mini";

export default function DriverRideRequest({ onSelectCustomer, activeRides }) {
    const [loadedResponse, setLoadedResponse] = useState(false);
    const [rideRequests, setRideRequests] = useState(null);

    function acceptRide(rideId) {
        axios
            .patch("api/driver/acceptRide", {
                rideId: rideId,
            })
            .then((res) => {
                console.log("acceptRide", res.data);
            })
            .catch((err) => {
                console.log("acceptRide", err);
            });
    }

    function checkRideRequests() {
        console.log("checkRideRequests");
        if (window.location.pathname != "/") {
            console.log("checkRideRequests - returning");
            return;
        }
        axios
            .get("/api/driver/getRequestsForDriver", {
                params: { lat: lat, lng: lng, vehicleType: vehicleType },
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

    // function checkRideStatus() {
    //     console.log("checkRideStatus");
    //     console.log(rideID);

    //     console.log(window.location.pathname);
    //     if (window.location.pathname != "/trackride") {
    //         console.log("returning");
    //         return;
    //     }

    //     axios
    //         .get("/api/checkridestatus", { params: { rideID: rideID } })
    //         .then((res) => {
    //             console.log(res.data);
    //             setRideState(res.data.rideStatus);
    //             setDriverID(res.data.driverID);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     setTimeout(checkRideStatus, 5000);
    // }

    const [activeCustomer, setActiveCustomer] = useState(null);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Ride Requests
            </Typography>
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
                                        <Grid item xs={12}>
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
                                        {/* <Grid item xs={3}>
                                            <br />
                                            <Typography
                                                align="right"
                                                variant="h6"
                                            >
                                                {"5 min away"}
                                            </Typography>
                                        </Grid> */}
                                        <Grid item xs={12}>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        acceptRide(
                                                            rideRequests[i]._id
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
