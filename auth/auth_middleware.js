const jwt = require('jsonwebtoken');

const {jwtSecret} = require('../configs/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                console.log('error verifying token', err);
                res.status(401).json({ message: 'could not verify credentials' })
            } else {
                // console.log(req)
                req.user = decodedToken.user;
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'You don\'t have permission to be here' })
    }

}