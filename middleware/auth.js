const jwt = require('jsonwebtoken');
const secret = require('../config/secretToken');

module.exports =  function (req, res, next) { 
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        message: 'Unauthorized'
    }); 

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: 'Invalid Token'
        });
    }
}

