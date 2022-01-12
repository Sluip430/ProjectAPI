const axios = require('axios');
const { setFilmsToDB } = require('../database/repositories/movies');
const { setGenresToDB, setGenresToDBMovies } = require('../database/repositories/genres');
const { setLanguageToDB } = require('../database/repositories/languages');

const getFilmsToDB = async () => {
    for (let i = 3; i < 200; i++) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=1f0a8650dad491fb0b06aabbc701815a`);
            if (!response.data.backdrop_path || !response.data.overview || !response.data.poster_path) continue;
            const { error: dbErrorFilms } = await setFilmsToDB(response.data);
            const { error: dbErrorMovies } = await setGenresToDBMovies(response.data);
            if (dbErrorFilms) return { error: { status: 500, data: dbErrorFilms } };
            if (dbErrorMovies) return { error: { status: 500, data: dbErrorMovies } };
        } catch (error) {
            if (error.response?.status === 404) {
                i++;
            } else {
                return { error: { status: 401, data: error } };
            }
        }
    }
    return { result: { status: 201 } };
};

const getGenresToDB = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1f0a8650dad491fb0b06aabbc701815a');
        const { error: dbError, result } = await setGenresToDB(response.data);
        if (dbError) return { error: { status: 500, data: dbError } };
        return { result: { data: result, status: 200 } };
    } catch (error) {
        return { error: { status: 500, data: error } };
    }
};

const getLanguageToDB = async () => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/configuration/languages?api_key=1f0a8650dad491fb0b06aabbc701815a');
        const { error: dbError, result } = await setLanguageToDB(response.data);
        if (dbError) return { error: { status: 500, data: dbError } };
        return { result: { data: result, status: 200 } };
    } catch (error) {
        return { error: { status: 500, data: error } };
    }
};


module.exports = { getFilmsToDB, getGenresToDB, getLanguageToDB };
