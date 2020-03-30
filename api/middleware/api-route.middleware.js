const jwtservice = require('../jwt/jwt-service');

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        const cookie = req.cookies;
        jwtservice.verifyToken(cookie.accessToken)
            .then(details => {
                next();
            })
            .catch(error => {
                res.status(error.code).send(error);
            });

    }
}