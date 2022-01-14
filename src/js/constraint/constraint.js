const SET_FILMS_TO_DB_URL = '/get-films-to-db';
const SET_GENRES_TO_DB_URL = '/get-genres-to-db';
const SET_LANGUAGE_TO_DB_URL = '/get-language-to-db';
const CREATE_USER_URL = '/create-user';
const LOG_IN_URL = '/log-in';
const MOVIES_URL = '/movies';
const MOVIE_URL = '/movie/';
const LANGUAGE_URL = '/language';
const TMDB_TO_MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'api_key=1f0a8650dad491fb0b06aabbc701815a';
const TMDB_GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`;
const TMDB_LANGUAGE_URL = `https://api.themoviedb.org/3/configuration/languages?${API_KEY}`;

module.exports = { SET_FILMS_TO_DB_URL, SET_GENRES_TO_DB_URL, SET_LANGUAGE_TO_DB_URL, CREATE_USER_URL, LOG_IN_URL, MOVIES_URL, MOVIE_URL, LANGUAGE_URL, TMDB_TO_MOVIE_URL, API_KEY, TMDB_GENRES_URL, TMDB_LANGUAGE_URL }