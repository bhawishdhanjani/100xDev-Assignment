const {User} = require("../db");

function userMiddleware(req, res, next) {
    let username = req.headers["username"];
    let password = req.headers["password"];
    let userExits =User.findOne({
        username,
        password
    });

    return userExits == null ? res.status(403).json({
        msg: "User doesnt exist"
    }):next();


    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;