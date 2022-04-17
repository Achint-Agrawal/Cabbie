const express = require("express");
const { Rider, Driver } = require("../models/user");
const router = express.Router();
const { Booking } = require("../models/booking");
const { DriverReview } = require("../models/driverReview");

router.post("/bookride", (req, res, next) => {
    // console.log(req);
    const booking = {
        userID: req.body.userID,  //we need to authorize to get userID from database 1
        pickupName: req.body.pickupName, 
        pickupLat: req.body.pickupLat,
        pickupLng: req.body.pickupLng,
        dropName: req.body.dropNameme,
        dropLat: req.body.dropLat,
        dropLng: req.body.dropLng,
        rideStatus: "requested",
        driverID: null,
        fare: null,
    };
    if (!booking.userID || !booking.pickupLat || !booking.pickupLng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.create(booking)
        .then((data) => res.json(data))
        .catch(next);
});

router.get("/checkridestatus", (req, res, next) => {
    // console.log(req);
    const id = req.body.rideId;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            res.status(200).json(doc.rideStatus);
        }
    });
});

// router.get('/logout', (req, res) => {
//     sessionStorage.clear();
//     res.send("logout successfull");
// });
router.get("/getDriverDetails", (req, res, next) => {
    const id = req.body.driverId;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Driver.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            delete doc["password"];
            res.status(200).json(doc);
        }
    });
});

router.post("/addDriverReview", (req, res, next) => {
    if (
        !req.body.rideId ||
        !req.body.driverId ||
        !req.body.riderId ||
        !req.body.rating
    ) {
        return res.status(422).json("A required field is empty");
    }
    DriverReview.create(req.body)
        .then((data) => res.status(200).json("Review added successfully"))
        .catch(next);
});

module.exports = router;
