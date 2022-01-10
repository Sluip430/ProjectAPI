const pgClient = require('../database');

const setGenresToDB = async (query) => {
    const { genres } = query;
    const values = genres.map((genre) => `(${genre.id}, '${genre.name}')`);

    const pgQuery = `
        INSERT INTO genres (id, name) 
        VALUES ${values.join(',')};
    `;

    try {
        await pgClient.query(pgQuery);
        return { result: 'Insert successful' };
    } catch (error) {
        return { error: error.message };
    }
};

const setGenresToDBMovies = async (query) => {
    const { genres, id: movieId } = query;
    const values = genres.map((genre) => `(${movieId}, ${genre.id})`);

    const pgQuery = `
        INSERT INTO movies_genres (movie_id, genre_id) 
        VALUES ${values.join(',')};
    `;

    try {
        await pgClient.query(pgQuery);
        return { result: 'Insert successful' };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { setGenresToDB, setGenresToDBMovies };
