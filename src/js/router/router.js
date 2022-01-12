const URL = require('url');
const getToDBController = require('../controller/setToDBController');
const userController = require('../controller/userController');
const movieController = require('../controller/movieController');

const router = async ({ req, res, body }) => {
    let result, error;
    const { method, url } = req;
    const { query, pathname } = URL.parse(url, true);
    switch (true) {
        case method === 'GET' && pathname === '/get-films-to-db':
            ({ result, error } = await getToDBController.getFilmsToDBController(query));
            break;
        case method === 'GET' && pathname === '/get-genres-to-db':
            ({ result, error } = await getToDBController.getGenresToDBController(query));
            break;
        case method === 'GET' && pathname === '/get-language-to-db':
            ({ result, error } = await getToDBController.getLanguageToDBController(query));
            break;
        case (method === 'POST' && pathname === '/create-user'):
            ({ result, error } = await userController.createUser(body));
            break;
        case (method === 'POST' && pathname === '/log-in'):
            ({ result, error } = await userController.logIn(body));
            break;
        case method === 'GET' && pathname === '/movies':
            ({ result, error } = await movieController.getMoviesFilter(query));
            break;
        case method === 'GET' && pathname === '/movie/':
            ({ result, error } = await movieController.getMoviesId(query));
            break;
        case method === 'GET' && pathname === '/language':
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
