const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decodedToken = jwt.verify(token, 'pcpartpicker@2024');

        req.userId = decodedToken.userId;
        req.userType = decodedToken.userType;

        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
