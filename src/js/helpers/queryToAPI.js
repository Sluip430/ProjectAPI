const axios = require('axios');
const { setFilmsToDB } = require('../database/repositories/movies');
const { setGenresToDB, setGenresToDBMovies } = require('../database/repositories/genres');
let result1;

const getFilmsToDB = async () => {
    for(let i = 2; i < 200; i++){
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=1f0a8650dad491fb0b06aabbc701815a`);
            const { error: dbError, result } = await setFilmsToDB(response.data);
            result1 = result;
            if (dbError) throw { error: { status: 500, data: dbError } };
        }catch (error){
            if (error.response.status === 404){
                i++ 
            }else{
                return { error: { status: 500, data: dbError } }
            }
        }
    }
    return { result: { data: result1, status: 201 } };
}

const getGenresToDB = async () => {
    try{
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=1f0a8650dad491fb0b06aabbc701815a');
        const { error: dbError, result } = await setGenresToDB(response.data);
        if (dbError) throw { error: { status: 500, data: dbError } };
        return { result: { data: result, status: 200 } }
    }catch (error){
        return { error: { status: 500, data: error.message } }
    }
}

const getGenresToDBMovies = async () => {
    for(let i = 2; i < 200; i++){
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=1f0a8650dad491fb0b06aabbc701815a`);
            const { error: dbError, result } = await setGenresToDBMovies(response.data);
            result1 = result;
            if (dbError) throw { error: { status: 500, data: dbError } };
        }catch (error){
            if (error.response.status === 404){
                i++ 
            }else{
                return { error: { status: 500, data: dbError } }
            }
        }
    }
    return { result: { data: result1, status: 201 } };
}

module.exports = { getFilmsToDB, getGenresToDB, getGenresToDBMovies };