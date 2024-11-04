const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (roles) => {
    return async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = await User.findById(decoded.id); 
            
 
            if (roles && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = auth;
