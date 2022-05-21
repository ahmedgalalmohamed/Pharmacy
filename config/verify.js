const Jwt = require('jsonwebtoken');

function verifyId(req, res, next) {
    if (req.headers['authorization'] !== undefined) {
        const authHeader = req.headers['authorization'];
        const token = JSON.parse(authHeader.split(' ')[1]);
        if (token == null) return res.status(401).json({msgError: "Error token is not null"})
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({msgError: err.message});
            next();
        });
    } else
        return res.status(401).json({msgError: "Error token is not null"})
}

module.exports = verifyId;