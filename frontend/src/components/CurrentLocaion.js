import React from "react";

const CurrentLocation = () => {
    // const [token, setToken] = useToken();

    function componentDidMount() {
        if ("geolocation" in navigator) {
            console.log("Available");
            return true;
        } else {
            console.log("Not Available");
            return false;
        }
    }

    function getPosition() {
        if (componentDidMount()) {
            navigator.geolocation.watchPosition(
                function (position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                },
                function (err) {
                    console.warn("ERROR(" + err.code + "): " + err.message);
                },
                {
                    enableHighAccuracy: true,
                    // timeout: 50000,
                    // maximumAge: 4000,
                }
            );
        }
    }
    return <React.Fragment>{getPosition()}</React.Fragment>;
};

export default CurrentLocation;
