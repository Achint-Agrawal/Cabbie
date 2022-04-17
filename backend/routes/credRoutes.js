const express = require("express");
const bcrypt = require("bcrypt");
const { Rider, Driver } = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");
const passport = require("passport");
const { application } = require('express');
const { Booking } = require("../models/booking");
const { DriverReview } = require("../models/driverReview");
const { authorization } = require('../api/login')

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

// router.delete('/logout', authorization, (req, res) => {
//     return res  
//         .clearCookie("token")
//         .status(200)
//         .json({ message: "Logged out successfully"});
// });

router.get('/welcome', authorization, (req, res) => {
    return res.status(200).json({ username: req.username });
})

module.exports = router;