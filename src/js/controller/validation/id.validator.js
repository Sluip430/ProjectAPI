const Joi = require('joi');

exports.idValidation = Joi.object().keys({
    id : Joi.number().positive().integer().required()
});