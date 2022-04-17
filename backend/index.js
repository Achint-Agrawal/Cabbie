const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const riderRoutes = require("./routes/riderAPI");
const driverRoutes = require("./routes/driverAPI");
const { authorization } = require('./api/login');
const credRoutes = require('./routes/credRoutes')
var cookieParser = require('cookie-parser');

require("dotenv").config();
const PORT = 3001;

const app = express();

app.use(cookieParser())

//take care of CORS related issues
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//connect to the database
mongoose
    .connect(process.env.RIDESHARE_DB_URI, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

//make use of routes
app.use("/api", credRoutes);
app.use("/api", authorization, riderRoutes);
app.use("/api/driver", authorization, driverRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
