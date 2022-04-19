import React from "react";
import DriverRideRequest from "./DriverRideRequest";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePrivate = () => {
    return (
        <div>
            {/* <h1>Welcome, You are successfully logged in</h1>
            <h3>Below are active rides for you</h3> */}
            <DriverRideRequest />
        </div>
    );
};

export default HomePrivate;
