const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
*** Check authentication
*/
function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        req.userData = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});     
    }
}

module.exports = {
    checkAuth: checkAuth
}