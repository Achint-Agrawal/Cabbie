import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link to="/">My homepage</Link> {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn({ setToken, setUserType }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [stay, setStay] = useState(false);

    const navigate = useNavigate();

    function handleEmail(event) {
        event.preventDefault();
        setEmail(event.target.value);
    }

    let errorAlert;

    function handlePassword(event) {
        event.preventDefault();
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });

        axios
            .post("/api/login", { email: email, password: password })
            .then((res) => {
                console.log("res");

                if (res.data.success) {
                    console.log(res.data);
                    console.log("token", res.data.token);
                    setToken(res.data.token);
                    setUserType(res.data.userType);
                    localStorage.setItem("userType", res.data.userType);
                    localStorage.setItem("userImage", res.data.userImage);
                }

                if (res.data.success) {
                    console.log(res.data);
                    console.log("token", res.data.token);
                    setToken(res.data.token);
                    setUserType(res.data.userType);
                    localStorage.setItem("userType", res.data.userType);
                    localStorage.setItem("userImage", res.data.userImage);
                }

                setStay(true);
                errorAlert = (
                    <p style={{ color: "red" }}>
                        some error occurred, try again!!
                    </p>
                );
                navigate("/");
            })
            .catch((err) => {
                // console.log("err", err.response.status);

                const status = err.response.status;

                if (status === 404) {
                    alert("Email not registered!!");
                } else if (status === 400) {
                    alert("Incorrect Password!!");
                }
                setStay(true);
                errorAlert = (
                    <p style={{ color: "red" }}>
                        some error occurred, try again!!
                    </p>
                );
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography component="h3" variant="h5">
                        {!stay ? errorAlert : <></>}{" "}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            autoFocus
                            onChange={handleEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePassword}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
