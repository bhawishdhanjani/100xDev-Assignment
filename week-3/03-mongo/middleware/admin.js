// Middleware for handling auth

const {Admin} = require("../db")

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    let username = req.headers["username"];
    let password = req.headers["password"];
    let ifExit = Admin.findOne({
        username,password
    })
    return ifExit == null ? res.status(403).json({
        msg: "Admin doesnt exist"
    }):next();
}

module.exports = adminMiddleware;