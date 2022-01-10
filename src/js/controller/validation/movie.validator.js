const Joi = require('joi');

exports.movieFilterValidation = Joi.object().keys({
    page: Joi.number().integer().positive().default(1),
    per_page: Joi.number().integer().positive().default(20),
    adult: Joi.boolean(),
    backdrop_path: Joi.string().min(3),
    budget: Joi.number().integer().positive(),
    homepage: Joi.string(),
    imdb_id: Joi.string().min(3),
    original_language: Joi.string().min(2),
    original_title: Joi.string().min(3),
    overview: Joi.string().min(3),
    popularity: Joi.number().positive(),
    poster_path: Joi.string().min(3),
    release_date: Joi.string().min(3),
    status: Joi.string().min(3),
    title: Joi.string().min(3),
    vote_average: Joi.number().positive(),
    vote_count: Joi.number().integer().positive(),
});
