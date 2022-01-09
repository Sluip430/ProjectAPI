const URL = require('url');
// const { createUniversitie , getUniversitie, getUniversitiesList } = require('../controller/controller');
// const { createTeacherController, getTeacherByIdController } = require('../controller/userController.js');
// const { createCourseController } = require('../controller/courseController');
const getToDBController = require('../controller/setToDBController');
const userController = require('../controller/userController');
const movieController = require('../controller/movieController');
// const { createUserController } = require('../controller/userController');


const router = async ({ req, res, body }) => {
  let result, error;
  const { method, url } = req;
  const { query, pathname } = URL.parse(url, true);
  switch (true) {
    case method === 'GET' && pathname === "/get-films-to-db" :
      ({ result, error } = await getToDBController.getFilmsToDBController(query));
      break;
    case method === 'GET' && pathname === "/get-genres-to-db" :
        ({ result, error } = await getToDBController.getGenresToDBController(query));
        break;
    case method === 'GET' && pathname === "/get-genres-to-movies" :
        ({ result, error } = await getToDBController.getGenresToMovies(query));
        break;
    case (method === 'POST' && pathname === '/create-user'):
      result = await userController.createUser(body);
      break;
    case (method === 'POST' && pathname === '/log-in'):
      result = await userController.logIn(body);
      break;
    case method === 'GET' && pathname === "/movies":
      ({ result, error } = await movieController.getMoviesFilter(query));
      break;

    case method === 'GET' && pathname === "/movie/":
      ({ result, error } = await movieController.getMoviesId(query));
      break;
    
    default:
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: 'Route Not Found' }));
  }
  if (error) {
    res.statusCode = error.status;
    return res.end(JSON.stringify(error.data));
  }
  const {status , token} = result;
  if (token) res.setHeader('token', token);
  res.statusCode = status;
  res.end(JSON.stringify(result.data));
};

module.exports = { router };