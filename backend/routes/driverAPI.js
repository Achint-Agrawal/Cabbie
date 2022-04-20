const express = require("express");
const { Rider, Driver } = require("../models/user");
const { Booking } = require("../models/booking");
const { RiderReview } = require("../models/riderReview");
const { DriverStatus } = require("../models/driverStatus");
const router = express.Router();

router.get("/getRequestsForDriver", async (req, res, next) => {
    const timestamp = Date.now();
    console.log("getRequestsForDriver", req.query);
    // console.log("getRequestsForDriver", timestamp);
    const driverLat = parseFloat(req.query.lat);
    const driverLng = parseFloat(req.query.lng);
    const vehicleType = req.query.vehicleType;
    // console.log("getRequestsForDriver", timestamp, driverLat, driverLng);
    if (!timestamp || !driverLat || !driverLng || !vehicleType) {
        return res.status(422).json("A required field is empty");
    }
    const docs = await Booking.find({
        timestamp: { $gt: timestamp - 2 * 1000 * 60 },
        pickupLat: { $gt: driverLat - 0.1, $lt: driverLat + 0.1 },
        pickupLng: { $gt: driverLng - 0.1, $lt: driverLng + 0.1 },
        rideStatus: "Requested",
        vehicleType: vehicleType,
    });

    // console.log(docs);
    let docs_ = JSON.parse(JSON.stringify(docs));
    console.log(docs_);
    for (let i = 0; i < docs_.length; i++) {
        const riderId = docs_[i].userID;
        // console.log(driverId);
        if (!riderId) {
            continue;
        }
        const rider = await Rider.findById(riderId);
        console.log(rider);
        docs_[i].riderName = rider.firstname + " " + rider.lastname;
        docs_[i].riderImage = rider.image_url;
        docs_[i].rating = rider.rating;
        // console.log(docs_[i]);
    }
    res.status(200).json(docs_);
});

router.patch("/acceptRide", (req, res, next) => {
    const id = req.body.rideId;
    const driverId = req.body.userID;
    console.log("acceptRide", id, driverId);
    if (!id || !driverId) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            if (doc.rideStatus == "Requested") {
                Booking.findByIdAndUpdate(
                    id,
                    { rideStatus: "Accepted", driverID: driverId },
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
    console.log("checkridestatus query", req.query);
    const id = req.query.rideID;
    console.log("checkridestatus id", id);
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
    console.log("getRiderDetails id", id);
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
    console.log("addRideReview");
    console.log("addRideReview body", req.body);
    const rideId = req.body.rideId;
    const riderId = req.body.riderId;
    const rating = req.body.rating;
    const review = req.body.review;
    const driverId = req.body.userID;
    if (!rideId || !riderId || !rating || !driverId) {
        return res.status(422).json("A required field is empty");
    }
    const riderReview = {
        rideId: rideId,
        riderId: riderId,
        driverId: driverId,
        rating: rating,
        review: review,
    };
    RiderReview.create(riderReview)
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
    const id = req.body.userID;
    console.log("getPastRides req.body", req.body);
    console.log("getPastRides id", id);

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
        const riderId = docs_[i].userID;
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
    console.log("getUserProfile", req.body);
    const id = req.body.userID;
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Driver.findById(id, (err, doc) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            console.log("getUserProfile-doc ", doc);
            delete doc["password"];
            res.status(200).json(doc);
        }
    });
});

router.patch("/finishRide", (req, res, next) => {
    const id = req.body.rideId;
    console.log("finishRide id", id);
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        { rideStatus: "Completed" },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

router.patch("/markPaymentPending", (req, res, next) => {
    const id = req.body.rideId;
    console.log("markPaymentPending id", id);
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        { rideStatus: "Payment Pending" },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

router.patch("/startRide", (req, res, next) => {
    const id = req.body.rideId;
    console.log("startRide id", id);
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        { rideStatus: "Started" },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

router.patch("/cancelRide", (req, res, next) => {
    const id = req.body.rideId;
    console.log("cancelRide id", id);
    if (!id) {
        return res.status(422).json("A required field is empty");
    }
    Booking.findByIdAndUpdate(
        id,
        { rideStatus: "Cancelled" },
        { new: true },
        (err, doc) => {
            if (err) {
                res.status(404).json("Ride Not Found");
            } else {
                res.status(200).json(doc);
            }
        }
    );
});

module.exports = router;
