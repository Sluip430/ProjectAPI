const pgClient = require('../database');

const setGenresToDB = async (query) => {
    const { genres } = query;
    try {
        genres.forEach(async item =>{
            let { id, name} = item;
            await pgClient.query(`INSERT INTO genres ( id, name) VALUES (${id} , '${name}');`);
        })
        return { result: 'Insert successful' };
    } catch (e) {
        return { error: e.message }
    }
};

const setGenresToDBMovies = async (query) => {
    const { genres , id:movieId } = query;
    try {
        genres.forEach(async item =>{
            let { id:genreId } = item;
            await pgClient.query(`INSERT INTO movies_genres ( movie_id, genre_id) VALUES (${movieId} , '${genreId}');`);
        })
        return { result: 'Insert successful' };
    } catch (e) {
        return { error: e.message }
    }
};

module.exports = { setGenresToDB, setGenresToDBMovies }