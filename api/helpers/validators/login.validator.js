const Joi = require('@hapi/joi');

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9@#!$%&^*(){}?/.,]{8,10}$'))
        .required(),
})

module.exports = schema;
