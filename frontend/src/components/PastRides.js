import * as React from "react";
import axios from "axios";
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
import { useRef, useState, useEffect } from "react";

axios.defaults.withCredentials = true;

// const riderId = "625972c5258ca778038d179e";

export default function PastRides() {
    const [loadedResponse, setLoadedResponse] = useState(false);
    const [pastRides, setPastRides] = useState(null);

    useEffect(() => {
        axios
            // .get("/api/getPastRides", { params: { riderId: riderId } })
            .get("/api/getPastRides")
            .then((res) => {
                console.log(res.data);
                setLoadedResponse(true);
                setPastRides(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function getDateString(timestamp) {
        // var d = new Date(timestamp);
        // const d = Date.now();
        let date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(timestamp);
        return date;
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {"Past Rides"}
            </Typography>
            {!loadedResponse && <div>Loading...</div>}
            {pastRides != null ? (
                <List fullWidth>
                    {pastRides.map((ride, i) => (
                        <ListItem>
                            <Card
                                sx={{
                                    width: "100%",
                                    height: 150,
                                    padding: 2,
                                }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    paddingRight={2}
                                    sx={12}
                                >
                                    <Grid item xs={9}>
                                        <Typography variant="h5">
                                            {getDateString(
                                                Date.parse(ride.timestamp)
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {ride.vehicleType}
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
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography align="right" variant="h6">
                                            {"\u20B9" +
                                                ride.fare +
                                                "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                                        </Typography>
                                        <CardMedia
                                            sx={{
                                                borderRadius: "50%",
                                                width: 110,
                                            }}
                                            component="img"
                                            height="110"
                                            image={ride.driverImage}
                                            align="right"
                                        ></CardMedia>
                                    </Grid>
                                </Grid>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <div>Loading...</div>
            )}
        </React.Fragment>
    );
}
