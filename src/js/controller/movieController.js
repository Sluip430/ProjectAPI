const validators = require('./validation');
const { getMoviesDBFilter, getMoviesDBId } = require('../database/repositories/movies');
const { getLanguagesDB } = require('../database/repositories/languages');

const getMoviesFilter = async (query) => {
    const { value, error } = validators.validate(query, validators.movieFilterValidation);
    if (error) return { error };
    const { error: dbError, result } = await getMoviesDBFilter(value);

    if (dbError) return { error: { status: 500, data: dbError } };
    return { result: { data: result, status: 201 } };
};

const getMoviesId = async (query) => {
    const { value, error } = validators.validate(query, validators.idValidation);
    if (error) return { error };

    const { error: dbError, result } = await getMoviesDBId(value);

    if (dbError) return { error: { status: 500, data: dbError } };
    return { result: { data: result, status: 200 } };
};

const getLanguages = async () => {
    const { error: dbError, result } = await getLanguagesDB();

    if (dbError) return { error: { status: 500, data: dbError } };
    return { result: { data: result, status: 200 } };
};

module.exports = { getMoviesFilter, getMoviesId, getLanguages };
