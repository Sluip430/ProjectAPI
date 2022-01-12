const Joi = require('joi');

exports.movieFilterValidation = Joi.object().keys({
    page: Joi.number().integer().positive().default(1),
    per_page: Joi.number().integer().positive().default(20),
    adult: Joi.boolean(),
    budget_min: Joi.number().integer(),
    budget_max: Joi.number().integer(),
    language: Joi.string().min(1),
    title: Joi.string().min(3),
    popularity_min: Joi.number(),
    popularity_max: Joi.number(),
    release_date_first: Joi.string().min(3),
    release_date_last: Joi.string().min(3),
    status: Joi.string().min(3),
    revenue_min: Joi.number().integer(),
    revenue_max: Joi.number().integer(),
});
