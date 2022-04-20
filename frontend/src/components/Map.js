import React, { useMemo } from "react";
import { Grid } from "@mui/material";
import SignIn from "./SignIn";
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

const center = {
    lat: 26.456,
    lng: 80.3319,
};

const Map = ({ pickup, drop, directionsResponse }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
        defaultCenter: center,
        defaultZoom: 15,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
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
            center={center}
            zoom={15}
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

export default Map;
