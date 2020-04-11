const Joi = require('@hapi/joi');

const schema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(20)
        .required(),

    lastName: Joi.string()
        .min(3)
        .max(20)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9@#!$%&^*(){}?/.,]{8,10}$'))
        .required(),

    avtar: Joi.any().allow(null)
})

module.exports = schema;
