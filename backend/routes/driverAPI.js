const express = require("express");
const { Rider, Driver } = require("../models/user");
const { Booking } = require("../models/booking");
const { RiderReview } = require("../models/riderReview");
const { DriverStatus } = require("../models/driverStatus");
const router = express.Router();

// router.post("/signup", (req, res, next) => {
//     const temp = req.body;
//     const pload = {
//         // username: temp.username,
//         contact: temp.contact,
//         email: temp.email,
//         password: temp.password,
//         address: temp.address,
//         licence_number: temp.licence_number,
//     };

//     pload.rating = 0;
//     pload.image_url = "http://placehold.jp/150x150.png";

//     Driver.create(pload)
//         .then((data) => res.json(data))
//         .catch(next);
// });

router.get("/getRequestsForDriver", (req, res, next) => {
    const timestamp = Date.now();
    console.log(timestamp);
    const pickupLat = req.body.pickupLat;
    const pickupLng = req.body.pickupLng;
    if (!timestamp || !pickupLat || !pickupLng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.find(
        {
            timestamp: { $gt: timestamp - 2 * 1000 * 60 },
            pickupLat: { $gt: pickupLat - 0.1, $lt: pickupLat + 0.1 },
            pickupLng: { $gt: pickupLng - 0.1, $lt: pickupLng + 0.1 },
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

router.patch("/acceptRide", (req, res, next) => {
    const id = req.body.rideId;
    const driverId = req.body.driverId;
    if (!id || !driverId) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            if (doc.rideStatus == "requested") {
                Booking.findByIdAndUpdate(
                    id,
                    { rideStatus: "accepted", driverId: driverId },
                    (err, doc) => {
                        if (err) {
                            res.status(404).json("Ride Not Found");
                        } else {
                            res.status(200).json(doc.rideId);
                        }
                    }
                );
            } else {
                // console.log(doc);
                return res.status(412).json("Ride can not be accepted");
            }
        }
    });
});

router.get("/getRiderDetails", (req, res, next) => {
    const id = req.body.riderId;
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

router.post("/addRiderReview", (req, res, next) => {
    if (
        !req.body.rideId ||
        !req.body.driverId ||
        !req.body.riderId ||
        !req.body.rating
    ) {
        return res.status(422).json("A required field is empty");
    }
    RiderReview.create(req.body)
        .then((data) => res.status(200).json("Review added successfully"))
        .catch(next);
});

router.patch("/updateDriverLocation", (req, res, next) => {
    console.log(req);
    const id = req.body.driverId;
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
                res.status(404).json("Driver Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

module.exports = router;
