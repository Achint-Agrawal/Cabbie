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

// const user = {
//     name: "Priydarshi Singh",
//     image: "/Priydarshi.png",
//     rating: 1.2,
//     contact: "7888817907",
//     email: "dryairship@gmail.com",
// };

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("/api/getUserProfile")
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                                src={user.image}
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
                                {user.name}
                            </Typography>
                            <Rating
                                readOnly="true"
                                value={user.rating}
                                precision={0.1}
                            />
                            <Typography color="#fcba03">
                                {"(" + user.rating + ")"}
                            </Typography>
                            <Typography
                                mt={2}
                                display="inline"
                                fontWeight={"bold"}
                            >
                                {"Phone No: "}
                            </Typography>
                            <Typography display="inline">
                                {user.contact}
                            </Typography>
                            <br />
                            <Typography display="inline" fontWeight={"bold"}>
                                {"Email: "}
                            </Typography>
                            <Typography display="inline">
                                {user.email}
                            </Typography>{" "}
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
