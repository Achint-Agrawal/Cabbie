import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import axios from "axios";

const driver = {
    name: "Daljit Singh",
    image: "/Daljit.png",
    rating: 2.1,
    carType: "Tata Nano",
    license: "UP42 SX 6969",
    phoneno: "7888817907",
};

const rideId = "625a0a0d8bcd14dc98700de2";

export default function OngoingRide() {
    const [RideState, setRideState] = useState("Accepted");
    function checkRideStatus() {
        console.log("checkRideStatus");
        axios("/api/checkridestatus", {
            method: "post",
            data: { rideId: rideId },
            withCredentials: true,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(checkRideStatus, 5000);
    }

    useEffect(() => {
        console.log("useeffect");
        return () => {
            checkRideStatus();
        };
    }, []);

    return (
        <React.Fragment>
            {RideState == "Accepted" && (
                <Typography variant="h6" gutterBottom>
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
            {(RideState == "Accepted" || RideState == "Started") && (
                <Card sx={{ width: "100%", height: 250 }}>
                    <Grid container spacing={2} sx={12}>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={driver.image}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="left" variant="h5">
                                {driver.name}
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
                                    {driver.license}
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
