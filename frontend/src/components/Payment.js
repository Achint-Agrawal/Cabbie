import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import axios from "axios";

const driver = {
    name: "Daljit Singh",
    image: "/Daljit.png",
    rating: 4.8,
    carType: "Tesla Model S",
    license: "UP42 SX 6969",
    phoneno: "6969696969",
};

const sfare = 105;

const rideId = "adsfk";
const driverId = "adsf";
const riderId = "esd";

export default function Payment({ rideID, setRideID, rideDetails, setRideDetails }) {
    const [fare, setFare] = useState();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const onReviewChange = (e) => {
        setReview(e.target.value);
    };

    const submitReview = () => {
        axios("/api/addDriverReview", {
            method: "post",
            data: {
                rideId: rideId,
                driverId: driverId,
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

    React.useEffect(() => {
        axios
            .get("/api/checkridestatus", { params: { rideID: rideID } })
            .then((res) => {
                console.log(res.data);
                // console.log("RIDE ID IN FRONTEND: ", res.data);
                setRideDetails(res.data);
                setRideID(res.data._id);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("rideDetails: ", rideDetails);
    return (
        <React.Fragment>
            {!rideDetails ? <div><h1>No payment due</h1></div> : <div>
                <Typography variant="h6" gutterBottom>
                    Ride {rideDetails.rideStatus}!!
                </Typography>

                <Card sx={{ width: "100%", height: 200 }}>
                    <br />
                    <Typography>Please pay</Typography>
                    <br />
                    <Typography variant="h2" fontWeight="Bold">
                        {`\u20B9 ${rideDetails.fare}`}
                    </Typography>
                    <br />
                    <Typography>to your driver</Typography>
                </Card>

                <br />

                <Card sx={{ width: "100%", height: 250 }}>
                    <Grid container spacing={2} sx={12}>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={driver.image}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <br />
                            <Typography align="center" variant="h5">
                                {"Rate your experience with " + driver.name}
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
                </Card> </div>}
        </React.Fragment>
    );
}
