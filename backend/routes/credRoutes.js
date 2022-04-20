const express = require("express");
const bcrypt = require("bcrypt");
const { Rider, Driver } = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");
const passport = require("passport");
const { application } = require("express");
const { Booking } = require("../models/booking");
const { DriverReview } = require("../models/driverReview");
const { authorization } = require("../api/login");

router.post("/driver/signup", (req, res, next) => {
    const temp = req.body;
    console.log("credRoutes /driver/signup", temp);
    const pload = {
        firstname: temp.firstname,
        lastname: temp.lastname,
        // username: temp.username,
        contact: temp.contact,
        email: temp.email,
        password: temp.password,
        address: temp.address,
        licence_number: temp.licence_number,
        vehicleType: temp.vehicleType,
        vehicleModel: temp.vehicleModel
    };

    Driver.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ userexist: "email already exist" });
        } else {
            console.log("new driver added");
        }
    });

    // pload.rating = 5;
    // pload.image_url = "http://placehold.jp/150x150.png";

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pload.password, salt, (err, hash) => {
            if (err) throw err;

            pload.password = hash;

            console.log('credRoutes driver/signup', pload);
            Driver.create(pload)
                .then((data) => res.json(data))
                .catch(next);
        });
    });
});

router.post("/driver/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    Driver.findOne({ email }).then((user) => {
        if (!user) {
            return res
                .status(404)
                .json({ usernotfound: "user not registered" });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                console.log(user);
                const payload = {
                    userID: user.id,
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
                            token: token,
                            userType: "1",
                            userImage: user.image_url,
                            vehicleType: user.vehicleType,
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

router.post("/signup", (req, res, next) => {
    const temp = req.body;
    const pload = {
        firstname: temp.firstname,
        lastname: temp.lastname,
        // username: temp.username,
        contact: temp.contact,
        email: temp.email,
        password: temp.password,
        address: temp.address,
    };

    Rider.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ userexist: "email already exist" });
        } else {
            console.log("hello");
        }
    });

    // pload.rating = 0;
    // pload.image_url = "http://placehold.jp/150x150.png";

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
    const email = req.body.email;
    const password = req.body.password;

    // console.log("logging in!!");
    Rider.findOne({ email }).then((user) => {
        if (!user) {
            return res
                .status(404)
                .json({ usernotfound: "user not registered" });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                console.log(user);
                const payload = {
                    userID: user.id,
                };

                console.log("#####################################");
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token,
                            userType: "0",
                            userImage: user.image_url,
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

module.exports = router;
