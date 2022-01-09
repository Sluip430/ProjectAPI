const Joi = require('joi');

exports.userValidation = Joi.object().keys({
    login: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    fist_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    role: Joi.string().min(8).default('users')
});