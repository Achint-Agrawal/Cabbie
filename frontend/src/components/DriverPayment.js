import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DriverPayment({ rideId, riderId }) {
    const [ride, setRide] = useState(null);
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        console.log("useEffect ride", rideId);
        if (rideId != null)
            axios
                .get("/api/driver/checkridestatus", {
                    params: { rideID: rideId },
                })
                .then((res) => {
                    console.log(res.data);
                    setRide(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
    }, [rideId]);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const onReviewChange = (e) => {
        setReview(e.target.value);
    };
    const submitReview = () => {
        axios("/api/driver/addRiderReview", {
            method: "post",
            data: {
                rideId: rideId,
                // driverId: driverId,
                riderId: riderId,
                rating: rating,
                review: review,
            },
            withCredentials: true,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <React.Fragment>
            {ride ? (
                <Typography variant="h6" gutterBottom>
                    {"Ride " + ride.rideStatus}
                </Typography>
            ) : (
                <Typography variant="h6" gutterBottom>
                    No Ongoing Rides
                </Typography>
            )}

            <Card sx={{ width: "100%", height: 200 }}>
                <br />
                <Typography>Please collect</Typography>
                <br />
                {ride && (
                    <Typography variant="h2" fontWeight="Bold">
                        {"\u20B9" + ride.fare}
                    </Typography>
                )}
                <br />
                {user && (
                    <Typography>
                        {"from " + user.firstname + " " + user.lastname}
                    </Typography>
                )}
            </Card>

            <Button variant="contained" sx={{ margin: 2 }}>
                Payment Recieved
            </Button>
            <br />

            {user && (
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
                            <br />
                            <Typography align="center" variant="h5">
                                {"Rate your experience with " +
                                    user.firstname +
                                    " " +
                                    user.lastname}
                            </Typography>
                            <div align="center">
                                <Rating
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                    precision={0.5}
                                    size="large"
                                />
                                <br />
                                <TextField
                                    fullWidth
                                    id="AddReview"
                                    label="Add a Review"
                                    variant="outlined"
                                    minRows={2}
                                    multiline
                                    onChange={onReviewChange}
                                />
                            </div>
                            <Button
                                onClick={submitReview}
                                variant="contained"
                                sx={{ mt: 1, mb: 1 }}
                            >
                                Submit Review
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            )}
        </React.Fragment>
    );
}
