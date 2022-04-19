import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useState, useEffect } from "react";
import axios from "axios";

const user = {
    name: "Daljit Singh",
    image: "/Daljit.png",
    rating: 1.2,
    contact: "7888817907",
    email: "daljitjohal@gmail.com",
    vehicleType: "Mini",
    vehicleModel: "Tata Nano",
    licence_number: "UP53 BA 3678",
};

export default function DriverProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("/api/driver/getUserProfile")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("DriverProfile");

    return (
        <React.Fragment>
            {user && (
                <Card>
                    <CardContent>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Avatar
                                src={user.image_url}
                                sx={{
                                    height: 100,
                                    mb: 2,
                                    width: 100,
                                }}
                            />
                            <Typography
                                color="textPrimary"
                                gutterBottom
                                variant="h5"
                            >
                                {user.firstname + " " + user.lastname}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={user.rating}
                                precision={0.1}
                            />
                            <Typography color="#fcba03">
                                {"(" + user.rating.toFixed(1) + ")"}
                            </Typography>
                            <Typography display="inline" mt={2}>
                                <b>Phone No: </b>
                                {user.contact}
                            </Typography>
                            <Typography>
                                <b>Email: </b>
                                {user.email}
                            </Typography>{" "}
                            <Typography>
                                <b>Vehicle Type: </b>
                                {user.vehicleType}
                            </Typography>{" "}
                            <Typography>
                                <b>Vehicle Model: </b>
                                {user.vehicleModel}
                            </Typography>
                            <Typography>
                                <b>License: </b>
                                {user.licence_number}
                            </Typography>
                        </Box>
                    </CardContent>
                    {/* <Divider /> 
            <CardActions>
                <Button color="primary" fullWidth variant="text">
                    Upload picture
                </Button>
            </CardActions> */}
                </Card>
            )}
        </React.Fragment>
    );
}
