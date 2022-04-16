const express = require("express");
const bcrypt = require("bcrypt");
const { Rider, Driver } = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");
const passport = require("passport");
const { application } = require('express');
const { Booking } = require("../models/booking");

router.post("/signup", (req, res, next) => {
    const temp = req.body;
    const pload = {
        username: temp.username,
        contact: temp.contact,
        email: temp.email,
        password: temp.password,
        address: temp.address,
    };

    Rider.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            return res.status(400).json({ userexist: "user already exist" });
        } else {
            console.log("hello");
        }
    });

    pload.rating = 0;
    pload.image_url = "http://placehold.jp/150x150.png";

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pload.password, salt, (err, hash) => {
            if (err) throw err;

            pload.password = hash;

            Rider.create(pload)
                .then((data) => res.json(data))
                .catch(next);
        });
    });
});

router.post("/login", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Rider.findOne({ username }).then((user) => {
        if (!user) {
            return res
                .status(404)
                .json({ usernotfound: "user not registered" });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

router.post("/bookride", (req, res, next) => {
    // console.log(req);
    const booking = {
        userID: req.body.userID,
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
    Booking.findById(id, (err, docs) => {
        if (err) {
            res.status(404).json("Ride Not Found");
        } else {
            res.status(200).json(docs.rideStatus);
        }
    });
});

// router.get('/logout', (req, res) => {
//     sessionStorage.clear();
//     res.send("logout successfull");
// });

module.exports = router;
