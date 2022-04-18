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
import { useRef, useState } from "react";

axios.defaults.withCredentials = true;
const vehicleTypes = [
    {
        id: 1,
        name: "Bike",
        image: "/motorcycle.jpeg",
        description: "Beat the traffic on a bike",
        fare: 10,
    },
    {
        id: 2,
        name: "Auto",
        image: "/auto.png",
        description: "Get pocket friendly autos at your doorstep",
        fare: 20,
    },
    {
        id: 3,
        name: "Mini",
        image: "/smallcar.jpeg",
        description: "Comfy, economical cars",
        fare: 30,
    },
    {
        id: 4,
        name: "Sedan",
        image: "/sedan.jpg",
        description: "Spacious sedans",
        fare: 40,
    },
];

const pastRides = [
    {
        timestamp: 1650267259,
        driverId: "adf",
        carType: "Mini",
        carModel: "Tata Nano",
        licenseNo: "UP53 Ab 1324",
        pickupName: "IIT Kanpur",
        dropName: "Kanpur Central",
        image: "/Daljit.png",
        fare: 24,
    },
    {
        timestamp: 1650267259,
        driverId: "adf",
        carType: "Mini",
        carModel: "Tata Nano",
        licenseNo: "UP53 Ab 1324",
        pickupName: "IIT Kanpur",
        image: "/Daljit.png",
        dropName: "Kanpur Central",
        fare: 52,
    },
    {
        timestamp: 1650267259,
        driverId: "adf",
        carType: "Mini",
        carModel: "Tata Nano",
        image: "/Daljit.png",
        licenseNo: "UP53 Ab 1324",
        pickupName: "IIT Kanpur",
        dropName: "Kanpur Central",
        fare: 35,
    },
];

export default function PastRides() {
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
                Past Rides
            </Typography>
            <List fullWidth>
                {pastRides.map((ride, i) => (
                    <ListItem>
                        <Card sx={{ width: "100%", height: 150, padding: 2 }}>
                            <Grid
                                container
                                spacing={2}
                                paddingRight={2}
                                sx={12}
                            >
                                <Grid item xs={9}>
                                    <Typography variant="h5">
                                        {getDateString(ride.timestamp)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {ride.carType + ", " + ride.carModel}
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
                                        image={ride.image}
                                        align="right"
                                    ></CardMedia>
                                </Grid>
                            </Grid>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
}
