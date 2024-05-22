const jwt = require("jsonwebtoken")

const privateKey = "abkabkhadsfkbskvbsfkhlbakbfbalkkgsdflkjaddfkjjhdsf";



function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    
    try{
        let token = req.headers["authorization"];
        if(token.substring(0,6)=="Bearer"){
            token = token.substring(7);
            jwt.verify(token,privateKey);
            next();
            return;
        }
        else{
            res.status(403).json({
                msg: "User doesnt exist"
            });
            return;
        }
                
    }
    catch{
        res.status(403).json({
            msg: "User doesnt exist"
        });
        return;
    }
}

module.exports = userMiddleware;