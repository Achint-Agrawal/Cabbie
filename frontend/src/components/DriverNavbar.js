import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Home", "Track Ride", "Payment"];
const settings = ["Profile", "Past Rides", "Logout"];

const DriverNavbar = ({ setToken, token, setUserType }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event) => {
        setAnchorElNav(null);

        console.log(event.target.textContent);

        const action = event.target.textContent;

        if (action === pages[0]) {
            navigate("/");
        } else if (action === pages[1]) {
            navigate("/driver/trackride");
        } else if (action === pages[2]) {
            navigate("/driver/payment");
        }
    };

    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
        // setAnchorElUser(null);
        console.log(event.target.textContent);

        const action = event.target.textContent;

        if (action === settings[0]) {
            navigate("/driver/profile");
        } else if (action === settings[1]) {
            navigate("/driver/pastrides");
        } else if (action === settings[2]) {
            setToken();
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate("/")}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            cursor: "pointer",
                        }}
                    >
                        CABBIE
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {!token ? (
                                <MenuItem></MenuItem>
                            ) : (
                                pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => navigate("/")}
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            cursor: "pointer",
                        }}
                    >
                        CABBIE
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {!token ? (
                            <></>
                        ) : (
                            pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            ))
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={localStorage.getItem("userImage")}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!token ? (
                                <MenuItem
                                    key={settings[2]}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {settings[2]}
                                    </Typography>
                                </MenuItem>
                            ) : (
                                settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default DriverNavbar;
