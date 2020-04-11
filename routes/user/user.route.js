const express = require('express');
const multer = require('multer');

const { ensureAuthenticated } = require('../../middleware/api-route.middleware');
const bcrypt = require('../../bcrypt/bcrypt.service');
const userValidator = require('../../helpers/validators/user.validator');
const userService = require('../../mongodb/services/user.service');

const ErrorModel = require('../../models/error-model');


const router = express.Router();
// Multer File upload settings
const DIR = 'public/upload/';

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("called");
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const imageError = new ErrorModel({
                code: 422,
                type: 'validation',
                message: 'Invalid image',
                description: 'Only .png, .jpg and .jpeg format allowed!'
            });
            return cb(imageError);
        }
    }
});

router.get('/:id', ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    userService.findUserById(id).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(err.code).send(err);
    });
});

router.post('/', upload.single('avtar'), (req, res) => {
    const { error, value } = userValidator.validate(req.body);
    if (error) {
        const reportError = new ErrorModel({
            code: 422,
            type: 'validation',
            message: 'Invalid inputs',
            description: error.details[0].message
        });
        return res.status(reportError.code).send(reportError);
    }
    if (req.file && req.file.filename) {
        const { host } = req.headers
        const filePath = `https://${host}/userProfile/${req.file.filename}`;
        // add user profile path
        value.avtar = filePath;
    } else {
        // add default profile
        const { host } = req.headers
        const filePath = `https://${host}/userProfile/avtar-placeholder.png`;
        // add user profile path
        value.avtar = filePath;
    }
    // Hash password
    bcrypt.generateHash(value.password).then(password => {
        // replace password with hash
        value.password = password;
        userService.addNewUser(value).then(user => {
            // delete password
            res.status(200).send(user);
        }).catch(err => {
            console.log("erro: ", err)
            res.status(err.code).send(err);
        })
    }).catch(hashErr => {
        res.status(hashErr.code).send(hashErr);
    });

});

module.exports = router;