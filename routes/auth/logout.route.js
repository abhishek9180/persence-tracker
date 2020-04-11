const express = require('express');
const router = express.Router();

router.head('/', (req, res) => {
    res.cookie('accessToken', '', { httpOnly: true });
    res.status(200).send()
})

module.exports = router;