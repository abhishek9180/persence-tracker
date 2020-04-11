const Joi = require('@hapi/joi');

const schema = Joi.object({
    frequencyReport: Joi.string()
        .required(),

    maxClaims: Joi.number()
        .required(),

    modelYear: Joi.string()
        .required(),

    paidDateFrom: Joi.date()
        .required(),

    paidDateTo: Joi.date()
        .required(),

    smlc: Joi.string()
        .required(),
})

module.exports = schema;