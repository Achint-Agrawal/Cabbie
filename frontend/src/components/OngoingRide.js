import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const tDriver = {
    name: "Daljit Singh",
    image_url: "/Daljit.png",
    rating: 2.1,
    carType: "Tata Nano",
    license_number: "UP42 SX 6969",
    contact: "7888817907",
};

// const rideID = "625a0a0d8bcd14dc98700de2";

export default function OngoingRide({rideID, rideDetails, setRideDetails}) {
    // const [RideState, setRideState] = useState("Accepted");
    const [driver, setDriver] = useState(tDriver);
    const [driverID, setDriverID] = useState();
    const [RideState, setRideState] = useState();
    const [driverState, setDriverState] = useState(false);

    // setDriver(tDriver);
    const location = useLocation();

    function checkRideStatus() {
        console.log("checkRideStatus");
        console.log(rideID);

        console.log(window.location.pathname);
        if (window.location.pathname != "/trackride") {
            console.log("returning");
            return;
        }

        axios
            .get("/api/checkridestatus", { params: { rideID: rideID } })
            .then((res) => {
                console.log(res.data);
                setRideState(res.data.rideStatus);
                setDriverID(res.data.driverID);
            })
            .catch((err) => {
                console.log(err);
            });

        setTimeout(checkRideStatus, 5000);
    }

    if(RideState == "Accepted" && !driverState){
        axios
            .get("/api/getDriverDetails", { params: { driverID: driverID } })
            .then((res) => {
                console.log(res.data);
                setRideDetails(res.data);
                setRideState(res.data.rideStatus);
                setDriverState(true);
                setDriverID(res.data.driverID);
                setDriver(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        setTimeout(checkRideStatus, 5000);
    }
    function cancelRide() {
        console.log("in cancelRide");
        axios
            .patch("/api/cancelRide", {
                rideID: rideID,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        console.log("useeffect");
        console.log("inside return");
        checkRideStatus();
        console.log("after checkridestatus");
    }, []);

    return (
        <React.Fragment>
            {RideState == "Accepted" && (
                <Typography variant="h6" gutterBottom>
                    <h2>Booking Accepted</h2>
                    Driver Details
                </Typography>
            )}
            {RideState == "Started" && (
                <Typography variant="h6" gutterBottom>
                    Ride Started
                </Typography>
            )}
            {RideState == "Requested" && (
                <Typography variant="h6" gutterBottom>
                    Waiting for driver to accept ride
                </Typography>
            )}
            {RideState == "Completed" && (
                <Typography variant="h6" gutterBottom>
                    Ride Completed. Book another ride!!
                </Typography>
            )}
            {RideState == "Cancelled" && (
                <Typography variant="h6" gutterBottom>
                    Ride Cancelled. Book another ride!!
                </Typography>
            )}
            {(RideState == "Accepted" || RideState == "Started") && (
                <Card sx={{ width: "100%", height: 250 }}>
                    <Grid container spacing={2} sx={12}>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={driver.image_url}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="left" variant="h5">
                                {driver.firstname + " " + driver.lastname}
                            </Typography>
                            <div align="left">
                                <Rating
                                    readOnly="true"
                                    value={driver.rating}
                                    precision={0.1}
                                />
                                <Typography color="#fcba03">
                                    {driver.rating}
                                </Typography>
                                <br />
                                <Typography>{driver.carType}</Typography>
                                <Typography fontWeight="Bold">
                                    {driver.license_number}
                                </Typography>
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
            )}
            {RideState == "Accepted" && (
                <div>
                    <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        <a id="call" href={"tel:" + driver.phoneno}>
                            Call Driver
                        </a>
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={cancelRide}
                    >
                        Cancel Ride
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
