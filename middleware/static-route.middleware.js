const jwtservice = require('../jwt/jwt-service');

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        const cookie = req.cookies;
        jwtservice.verifyToken(cookie.accessToken)
            .then(details => {
                next();
            })
            .catch(error => {
                res.cookie('accessToken', '', { httpOnly: true });
                res.redirect('/');
            });

    },
    checkAuthenticated: function (req, res, next) {
        const cookie = req.cookies;
        if (cookie && cookie.accessToken) {
            res.redirect('/oem-type');
        } else {
            next();
        }
    }
}