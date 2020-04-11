const Joi = require('@hapi/joi');

const tokenSchema = Joi.object({
    username: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9@#!$%&^*(){}?/.,]{8,10}$'))
        .required(),

    oemType: Joi.string()
        .required(),

    iat: Joi.number()
        .required(),

    exp: Joi.number()
        .required(),

    aud: Joi.string()
        .required(),

    iss: Joi.string()
        .required(),

    sub: Joi.string()
        .required(),

})

module.exports = tokenSchema;
