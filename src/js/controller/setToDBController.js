const { getFilmsToDB, getGenresToDB, getLanguageToDB } = require('../helpers/queryToAPI');

const getFilmsToDBController = async () => {
    const { error: reqError, result } = await getFilmsToDB();

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};

const getGenresToDBController = async () => {
    const { error: reqError, result } = await getGenresToDB();

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};

const getLanguageToDBController = async () => {
    const { error: reqError, result } = await getLanguageToDB();

    if (reqError) return { error: { status: 500, data: reqError } };
    return { result: { data: result, status: 201 } };
};

module.exports = { getFilmsToDBController, getGenresToDBController, getLanguageToDBController };
