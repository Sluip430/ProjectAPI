const validators = require('./validation');
const { getFilmsToDB, getGenresToDB, getGenresToDBMovies } = require ('../helpers/queryToAPI');

const getFilmsToDBController = async (query) => {
    // const { value, error } = validators.validate(body, validators.courseCreateValidator);
    // if (error) return { error };
    const { error: reqError, result } = await getFilmsToDB(query);

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};

const getGenresToDBController = async (query) => {
    // const { value, error } = validators.validate(body, validators.courseCreateValidator);
    // if (error) return { error };
    const { error: reqError, result } = await getGenresToDB(query);

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};

const getGenresToMovies = async (query) => {
    // const { value, error } = validators.validate(body, validators.courseCreateValidator);
    // if (error) return { error };
    const { error: reqError, result } = await getGenresToDBMovies(query);

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};


module.exports = { getFilmsToDBController, getGenresToDBController, getGenresToMovies };