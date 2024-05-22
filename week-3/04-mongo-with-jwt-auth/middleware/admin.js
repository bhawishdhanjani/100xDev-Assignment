const jwt = require("jsonwebtoken")

const privateKey = "abkabkhadsfkbskvbsfkhlbakbfbalkkgsdflkjaddfkjjhdsf";



// Middleware for handling auth
function  adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    
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
                msg: "Admin doesnt exist"
            });
            return;
        }
                
    }
    catch{
        
        res.status(403).json({
            msg: "Admin doesnt exist"
        });
        return;
    }
}

module.exports = adminMiddleware;