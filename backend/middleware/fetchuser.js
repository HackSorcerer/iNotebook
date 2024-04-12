var jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisismysecret'; // Secret key for JWT


var fetchuser = function fetchuser(req, res, next) {
    // Get the user from the jwt token and add id to req object
    var token = req.header('auth-token');
    
    if (!token) {
        res.status(401).send({
        error: "Please authenticate using a valid token"
        });
    }
    
    try {
        var data = jwt.verify(token, JWT_SECRET);
        User.findById(data.user.id).then(function (user) {
        req.user = user;
        next();
        });
    } catch (error) {
        res.status(401).send({
        error: "Please authenticate using a valid token"
        });
    }
    };

module.exports = fetchuser; 
