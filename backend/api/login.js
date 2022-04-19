const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");

// const { findUser } = require("../dao/userDAO.js");

// async function loginUser(req, res) {  // JWT token yet to be done
//     const username = req.body.username,
//         password = req.body.password;

//     findUser(username)
//         .then(result => {
//             const user = result.elem;

//             /*
//             bcrypt.compare(password, user.password)
//             .then( result => {
//                 if(result){
//                     res.status(200).json("User logged in successfully");
//                 }
//                 else {
//                     res.status(401).json("Incorrect password");
//                 }
//             })
//             */

//             var isValid = bcrypt.compareSync(password, user.password);

//             if (!isValid) return res.status(403).json({ message: "Incorrect password" });

//             const token = jwt.sign({ username: username }, "cs253ams", { expiresIn: "15m" });

//             return res
//                 // .cookie("token", token, {
//                 //     httpOnly: true
//                 // })
//                 .status(200)
//                 .json({ message: "Logged in successfully", token: token });

//         })
//         .catch(error => {

//             if (error.message === "User not found") {
//                 console.log(error.message);
//                 return res.status(400).json({ message: "User not registered" });
//             }

//             else {
//                 console.log(error.message);
//                 return res.status(500).json({ message: "Internal server error" });
//             }
//         });
// }

const authorization = async (req, res, next) => {
    // console.log("req object", req.headers);
    // console.log("req object", req.cookies.token);
    // return ;
    const token = req.cookies.token;

    // console.log("token", token);
    if (!token)
        return res.status(401).json({
            message: "Access denied. Token is required for authentication",
        });

    try {
        const data = await jwt.verify(token, keys.secretOrKey);
        // console.log(data);
        req.body.userID = data.userID;
        return next();
    } catch {
        return res.status(403).json({ message: "Token not valid" });
    }
};

module.exports = { authorization };
