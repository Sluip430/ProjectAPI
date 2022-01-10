const Joi = require('joi');

exports.userSignUpValidation = Joi.object().keys({
    login: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
});

exports.userSignInValidation = Joi.object().keys({
    login: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
});
