const URL = require('url');
const getToDBController = require('../controller/setToDBController');
const userController = require('../controller/userController');
const movieController = require('../controller/movieController');
const { SET_FILMS_TO_DB_URL, SET_GENRES_TO_DB_URL, SET_LANGUAGE_TO_DB_URL, CREATE_USER_URL, LOG_IN_URL, MOVIES_URL, MOVIE_URL, LANGUAGE_URL } = require('../constraint/constraint');

const router = async ({ req, res, body }) => {
    let result, error;
    const { method, url } = req;
    const { query, pathname } = URL.parse(url, true);
    switch (true) {
        case method === 'GET' && pathname === SET_FILMS_TO_DB_URL:
            ({ result, error } = await getToDBController.getFilmsToDBController());
            break;
        case method === 'GET' && pathname === SET_GENRES_TO_DB_URL:
            ({ result, error } = await getToDBController.getGenresToDBController());
            break;
        case method === 'GET' && pathname === SET_LANGUAGE_TO_DB_URL:
            ({ result, error } = await getToDBController.getLanguageToDBController());
            break;
        case (method === 'POST' && pathname === CREATE_USER_URL):
            ({ result, error } = await userController.createUser(body));
            break;
        case (method === 'POST' && pathname === LOG_IN_URL):
            ({ result, error } = await userController.logIn(body));
            break;
        case method === 'GET' && pathname === MOVIES_URL:
            ({ result, error } = await movieController.getMoviesFilter(query));
            break;
        case method === 'GET' && pathname === MOVIE_URL:
            ({ result, error } = await movieController.getMoviesId(query));
            break;
        case method === 'GET' && pathname === LANGUAGE_URL:
            ({ result, error } = await movieController.getLanguages(query));
            break;
        default:
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Route Not Found' }));
    }
    if (error) {
        res.statusCode = error.status;
        return res.end(JSON.stringify(error.data));
    }
    const { status, token, data } = result;
    if (token) res.setHeader('token', token);
    res.statusCode = status;
    res.end(JSON.stringify(data));
};

module.exports = { router };
