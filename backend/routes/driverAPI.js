const express = require('express');
const { Rider, Driver } = require('../models/user');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    const temp = req.body;
    const pload = {
        username: temp.firstname + '-' + temp.lastname,
        contact: temp.contact,
        email: temp.email,
        password: temp.password,
        address: temp.address,
        licence_number: temp.licence_number
    }

    pload.rating = 0;
    pload.image_url = "http://placehold.jp/150x150.png";

    Driver.create(pload)
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;