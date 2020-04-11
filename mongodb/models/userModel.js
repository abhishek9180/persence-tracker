var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var userSchema = require('../schemas/userSchema');

userSchema.plugin(uniqueValidator);

var User = mongoose.model('user', userSchema);

module.exports = User;