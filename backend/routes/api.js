const express = require('express');
const { Rider, Driver } = require('../models/user');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    if (req.body.username  != '' && req.body.password != '') {
        const temp = req.body;
        temp.rating = 0;
        temp.image_url = "http://placehold.jp/150x150.png";

        Rider.create(temp)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'The input field is empty',
        });
    }
});

module.exports = router;