const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next) {
   
    const token = req.headers['x-auth-token'] || req.cookies.token;
    console.log(token);   

    if (!token) {
        token = req.cookies.argon_user_token;  
        console.log('Token from cookie:', token);
    }

    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        console.log('Decoded user ID:', req.user.id);
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};