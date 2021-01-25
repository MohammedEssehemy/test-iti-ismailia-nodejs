const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const signedData = jwt.verify(authorization, 'my-signing-secret');
        req.signedData = signedData;
        next();
    } catch (err) {
        console.error(err);
        res.statusCode = 401;
        res.json({ success: false, message: "Authentication failed" });
    }
}