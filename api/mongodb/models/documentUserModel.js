const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const documentUserSchema = require('../schemas/documentUserSchema');

documentUserSchema.plugin(uniqueValidator);

const DocumentUserSchema = mongoose.model('documents', documentUserSchema);

module.exports = DocumentUserSchema;