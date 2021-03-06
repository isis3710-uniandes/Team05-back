const jwt = require('jsonwebtoken');
const jwtSecret = 'ncus8aMAbIA0MSnhai1';
const payload = {

           check:  true

         };

module.exports = {
    verifyToken:
        function (req, res, next) {
            let token = req.headers['x-access-token'];

            if (!token) {
                return res.status(403)
                    .send({
                        auth: false,
                        message: 'No token provided.'
                    });
            }
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (err) {
                    return res.status(500)
                        .send({
                            auth: false,
                            message: 'Failed to authenticate token.'
                        });
                }
                req.userRecord = decoded.userRecord;
                req.recordID = decoded.recordID;
                next();
            });
        },
    issueToken:
        function () {
            return jwt.sign(payload, jwtSecret);
        }
}
