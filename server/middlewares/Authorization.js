const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.sendStatus(401).json({
            message:"User Not found",
            app_status:false
        });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403).json({
                message:"invalid token",
                app_status:false
            });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
