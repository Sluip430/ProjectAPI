const Joi = require('joi');

exports.movieFilterValidation = Joi.object().keys({
    page: Joi.number().integer().positive().default(1),
    per_Page: Joi.number().integer().positive().default(20),
    adult: Joi.boolean(),
    budget_min: Joi.number().integer().positive(),
    budget_max: Joi.number().integer().positive(),
    language: Joi.string().min(1),
    title: Joi.string().min(3),
    popularity_min: Joi.number().positive(),
    popularity_max: Joi.number().positive(),
    release_date_first: Joi.string().min(3),
    release_date_last: Joi.string().min(3),
    status: Joi.string().min(3),
});