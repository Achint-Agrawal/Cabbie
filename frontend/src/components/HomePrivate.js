import React from "react";
import DriverRideRequest from "./DriverRideRequest";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePrivate = ({ userType }) => {
    return (
        <div>
            {/* <h1>Welcome, You are successfully logged in</h1>
            <h3>Below are active rides for you</h3> */}
            {userType === "1" ? <DriverRideRequest /> : <div><h1>Welcome To CABBIE</h1> <h2>You are logged in</h2></div>}
        </div>
    );
};

export default HomePrivate;
