const express = require('express');
const { ensureAuthenticated } = require('../../middleware/api-route.middleware');
const documentService = require('../../mongodb/services/document-user.service');


const router = express.Router();

router.get('/:id/users', ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    console.log("id: ", id);
    documentService.getDocumentActiveUsers({ 'documentId': id }).then(documentUsers => {
        res.status(200).send(documentUsers);
    }).catch(error => {
        res.status(error.code).send(error);
    })
})

module.exports = router;