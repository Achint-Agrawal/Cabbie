const express = require("express");
const { Rider, Driver } = require("../models/user");
const router = express.Router();
const { Booking } = require("../models/booking");
const { DriverReview } = require("../models/driverReview");

router.post("/bookride", (req, res, next) => {
    // console.log(req);
    const booking = {
        userID: req.body.userID, //we need to authorize to get userID from database 1
        pickupName: req.body.pickupName,
        pickupLat: req.body.pickupLat,
        pickupLng: req.body.pickupLng,
        dropName: req.body.dropName,
        dropLat: req.body.dropLat,
        dropLng: req.body.dropLng,
        rideStatus: "requested",
        driverID: null,
        fare: null,
    };

    console.log("userID = ", booking.userID);
    if (!booking.userID || !booking.pickupLat || !booking.pickupLng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.create(booking)
        .then((data) => {
            res.json({rideID: data._id});
            // console.log(res.data);
            console.log("success");
        })
        .catch(next);
});

router.get("/checkridestatus", (req, res, next) => {
    console.log(req.query);
    const id = req.query.rideID;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            res.status(200).json(doc);
        }
    });
});

// router.get('/logout', (req, res) => {
//     sessionStorage.clear();
//     res.send("logout successfull");
// });
router.get("/getDriverDetails", (req, res, next) => {
    const id = req.query.driverID;
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

router.get("/getUserProfile", (req, res, next) => {
    const id = req.body.userId;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Rider.findById(id, (err, doc) => {
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
        !req.body.rideID ||
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

router.patch("/updateRiderLocation", (req, res, next) => {
    console.log(req);
    const id = req.body.riderId;
    const lat = req.body.lat;
    const lng = req.body.lng;
    if (!id || !lat || !lng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        {
            lat: lat,
            lng: lng,
        },
        { upsert: true },
        (err, doc) => {
            if (err) {
                res.status(404).json("Rider Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

router.patch("/cancelRide", (req, res, next) => {
    const id = req.body.rideID;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        {
            rideStatus: "Cancelled",
        },
        (err, doc) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

router.patch("/getPastRides", (req, res, next) => {
    const id = req.query.riderId;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.find(
        {
            userID: id,
            rideStatus: "Completed",
        },
        (err, docs) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(docs);
            }
        }
    );
});

module.exports = router;
