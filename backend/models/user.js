const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiderSchema = new Schema({
    username: { type: String, required: [true, 'username should not be empty'] },
    contact: { type: String },
    email: { type: String, required: [true, 'email should be valid'] },
    password: { type: String },
    address: { type: String },
    image_url: { type: String },
    rating: { type: Number }
});

const DriverSchema = new Schema({
    username: { type: String, required: [true, 'username should not be empty'] },
    contact: { type: String },
    email: { type: String, required: [true, 'email should be valid'] },
    password: { type: String },
    address: { type: String },
    image_url: { type: String },
    rating: { type: Number },
    licence_number: {type: String, required:[true, 'licence is necessary to register as driver']}
});

const Rider = mongoose.model('rider', RiderSchema);
const Driver = mongoose.model('driver', DriverSchema);

module.exports = { Rider, Driver };