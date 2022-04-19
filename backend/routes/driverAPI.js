const express = require("express");
const { Rider, Driver } = require("../models/user");
const { Booking } = require("../models/booking");
const { RiderReview } = require("../models/riderReview");
const { DriverStatus } = require("../models/driverStatus");
const router = express.Router();

router.get("/getRequestsForDriver", (req, res, next) => {
    const timestamp = Date.now();
    console.log("getRequestsForDriver", timestamp);
    const driverLat = req.body.lat;
    const driverLng = req.body.lng;
    if (!timestamp || !driverLat || !driverLng) {
        return res.status(422).json("A required field is empty");
    }
    Booking.find(
        {
            timestamp: { $gt: timestamp - 2000 * 1000 * 60 },
            pickupLat: { $gt: driverLat - 0.1, $lt: driverLat + 0.1 },
            pickupLng: { $gt: driverLng - 0.1, $lt: driverLng + 0.1 },
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

router.get("/getRiderDetails", (req, res, next) => {
    const id = req.query.riderId;
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

router.get("/getPastRides", async (req, res, next) => {
    const id = req.query.driverID;
    console.log(id);
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    const docs = await Booking.find({
        driverID: id,
        rideStatus: "Completed",
    });
    let docs_ = JSON.parse(JSON.stringify(docs));
    console.log(docs_);
    for (let i = 0; i < docs_.length; i++) {
        const riderId = docs_[i].userId;
        // console.log(driverId);
        if (!riderId) {
            continue;
        }
        const rider = await Rider.findById(riderId);
        console.log(rider);
        docs_[i].riderName = rider.firstname + " " + rider.lastname;
        docs_[i].riderImage = rider.image_url;
        console.log(docs_[i]);
    }
    res.status(200).json(docs_);
});

router.get("/getUserProfile", (req, res, next) => {
    const id = req.body.userID;
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

module.exports = router;
