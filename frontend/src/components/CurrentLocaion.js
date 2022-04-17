import React from "react";
import axios from "axios";

const CurrentLocation = () => {
    // const [token, setToken] = useToken();

    let prevLocationTime = Date.now();

    function componentDidMount() {
        if ("geolocation" in navigator) {
            console.log("Available");
            return true;
        } else {
            console.log("Not Available");
            return false;
        }
    }

    function updatePosition(lat, lng) {
        let currTime = Date.now();
        if (currTime - prevLocationTime > 10000) {
            prevLocationTime = currTime;
            console.log(lat, lng);
        }
    }

    function getPosition() {
        console.log("getposition");
        if (componentDidMount()) {
            console.log("componentdidmount");
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    updatePosition(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    // console.log("Latitude is :", position.coords.latitude);
                    // console.log("Longitude is :", position.coords.longitude);
                },
                function (err) {
                    console.warn("ERROR(" + err.code + "): " + err.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                }
            );
        }
    }
    console.log(Math.random());
    return <React.Fragment>{getPosition()}</React.Fragment>;
};

export default CurrentLocation;
