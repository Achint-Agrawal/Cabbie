import React, { useEffect, useState } from "react";

import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
    minWidth: "400px",
    minHeight: "400px",
    display: "flex",
    // minHeight: "2600px",
};

// const center = {
//     lat: 26.456,
//     lng: 80.3319,
// };

const DriverMap = ({ center, pickup, drop }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
        defaultCenter: center,
        defaultZoom: 15,
    });
    const [position, setPosition] = useState(center);
    useEffect(() => {
        async function calculateRoute() {
            console.log(pickup, drop);
            // console.log(originRef, destinationRef);
            if (pickup === null || drop === null) {
                return;
            }
            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService();
            const results = await directionsService.route({
                origin: pickup,
                destination: drop,
                // eslint-disable-next-line no-undef
                travelMode: google.maps.TravelMode.DRIVING,
            });
            console.log(results);
            setDirectionsResponse(results);
            // onDirectionsResponse(results);
            // setDistance(results.routes[0].legs[0].distance.text);
            // setDuration(results.routes[0].legs[0].duration.text);
        }
        calculateRoute();
    }, [pickup, drop]);

    // useEffect(async () => {
    //     setPosition(center);
    //     if (map != null && directionsResponse == null) {
    //         await map.panTo(center);
    //         await map.setZoom(17);
    //     }
    // }, []);

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
        setPosition(center);
        if (map != null && directionsResponse == null) {
            map.panTo(center);
            map.setZoom(17);
        }
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {pickup && <Marker position={pickup} />}
            {drop && <Marker position={drop} />}
            {pickup && drop && directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
            )}
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
};

export default DriverMap;
