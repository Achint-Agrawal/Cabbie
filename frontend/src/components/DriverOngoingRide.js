import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const user = {
//     name: "Priydarshi Singh",
//     image: "/Priydarshi.png",
//     rating: 1.2,
//     phoneno: "7888817907",
//     pickup: "IIT Kanpur, Hall 9",
//     drop: "Kanpur Central",
// };

export default function DriverOngoingRide({ rideId, riderId }) {
    const [user, setUser] = useState(null);
    const [ride, setRide] = useState(null);
    const navigate = useNavigate();

    function cancelRide() {
        console.log("cancelRide", rideId);
        if (rideId != null) {
            console.log("cancelRide inside not null", rideId);
            axios
                .patch("/api/driver/cancelRide", { rideId: rideId })
                .then((res) => {
                    console.log(res.data);
                    setRide(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setTimeout(() => {
            navigate("/");
        }, 5000);
    }

    function startRide() {
        console.log("startRide", rideId);
        if (rideId != null) {
            console.log("startRide inside not null", rideId);
            axios
                .patch("/api/driver/startRide", { rideId: rideId })
                .then((res) => {
                    console.log("startRide res.data", res.data);
                    setRide(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function markPaymentPending() {
        console.log("markPaymentPending", rideId);
        if (rideId != null) {
            console.log("markPaymentPending inside not null", rideId);
            axios
                .patch("/api/driver/markPaymentPending", { rideId: rideId })
                .then((res) => {
                    console.log(res.data);
                    setRide(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        navigate("/driver/payment");
    }

    useEffect(() => {
        console.log("useEffect rider", riderId);
        if (riderId != null) {
            console.log("inside !rideId");
            axios
                .get("/api/driver/getRiderDetails", {
                    params: { riderId: riderId },
                })
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [riderId]);

    function checkRideStatus() {
        console.log("checkRideStatus");
        console.log(rideId);

        // console.log(window.location.pathname);
        if (
            window.location.pathname != "/driver/trackride" ||
            riderId == null
        ) {
            console.log("returning");
            return;
        }

        axios
            .get("/api/driver/checkridestatus", { params: { rideID: rideId } })
            .then((res) => {
                console.log(res.data);
                console.log("rideID in frontend: ", rideId);
                setRide(res.data);
                // setRideState(res.data.rideStatus);

                // if (!driverID) setDriverID(res.data.driverID);
            })
            .catch((err) => {
                console.log(err);
                // console.log("rideID in frontend: ", rideID);
            });

        setTimeout(checkRideStatus, 5000);
    }

    useEffect(() => {
        console.log("useEffect ride", rideId);
        if (rideId != null) checkRideStatus();
        // axios
        //     .get("/api/driver/checkridestatus", {
        //         params: { rideID: rideId },
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         setRide(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, [rideId]);

    return (
        <React.Fragment>
            {ride ? (
                <div>
                    {ride.rideStatus == "Accepted" && (
                        <Typography variant="h6" gutterBottom>
                            Customer Details
                        </Typography>
                    )}
                    {ride.rideStatus == "Started" && (
                        <Typography variant="h6" gutterBottom>
                            Ride Started
                        </Typography>
                    )}
                    {ride.rideStatus == "Cancelled" && (
                        <Typography variant="h6" gutterBottom>
                            Ride Cancelled
                        </Typography>
                    )}
                    {ride.rideStatus == "Completed" && (
                        <Typography variant="h6" gutterBottom>
                            Ride Completed
                        </Typography>
                    )}

                    {user &&
                        (ride.rideStatus == "Accepted" ||
                            ride.rideStatus == "Started") && (
                            <div>
                                <Card sx={{ width: "100%", height: 250 }}>
                                    <Grid container spacing={2} sx={12}>
                                        <Grid item xs={4}>
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={user.image_url}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography
                                                align="left"
                                                variant="h5"
                                            >
                                                {user.firstname +
                                                    " " +
                                                    user.lastname}
                                            </Typography>
                                            <div align="left">
                                                <Rating
                                                    readOnly="true"
                                                    value={user.rating}
                                                    precision={0.1}
                                                />
                                                <Typography color="#fcba03">
                                                    {user.rating}
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
                                        {/* <Grid item xs={2}>
                        <br />
                        {RideState == 1 && (
                            <Typography align="right" variant="h6">
                                {"5 min away"}
                            </Typography>
                        )}
                    </Grid> */}
                                    </Grid>
                                </Card>
                                {ride.rideStatus == "Accepted" && (
                                    <div>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            <a
                                                id="call"
                                                href={"tel:" + user.contact}
                                            >
                                                Call Customer
                                            </a>
                                        </Button>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={cancelRide}
                                        >
                                            Cancel Ride
                                        </Button>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={startRide}
                                        >
                                            Start Ride
                                        </Button>
                                    </div>
                                )}
                                {ride.rideStatus == "Started" && (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={markPaymentPending}
                                    >
                                        Finish Ride
                                    </Button>
                                )}
                            </div>
                        )}
                </div>
            ) : (
                <div>
                    <Typography variant="h6" gutterBottom>
                        No Ongoing Rides
                    </Typography>
                </div>
            )}
        </React.Fragment>
    );
}
