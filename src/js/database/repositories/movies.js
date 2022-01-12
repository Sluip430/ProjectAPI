const pgClient = require('../database');
const { getGenresArray } = require('../../helpers/getGenresArray');
const Joi = require("joi");

const setFilmsToDB = async (query) => {
    const {
        id,
        adult,
        backdrop_path,
        budget,
        homepage,
        imdb_id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        status,
        title,
        vote_average,
        vote_count,
        runtime,
    } = query;

    const newOriginalTitle = original_title.replace(/'/gi, '\'\'');
    const newTitle = title.replace(/'/gi, '\'\'');
    const newOverview = overview.replace(/'/gi, '\'\'');

    const pgQuery = `
        INSERT INTO movies (
            id, 
            runtime, 
            adult, 
            backdrop_path, 
            budget, 
            homepage, 
            imdb_id, 
            original_language, 
            original_title, 
            overview, 
            popularity, 
            poster_path, 
            release_date, 
            status, 
            title, 
            vote_average, 
            vote_count
        )
        VALUES (
            ${id}, 
            ${runtime}, 
            ${adult}, 
            '${backdrop_path}', 
            ${budget}, 
            '${homepage}', 
            '${imdb_id}', 
            '${original_language}', 
            '${newOriginalTitle}', 
            '${newOverview}', 
            ${popularity}, 
            '${poster_path}', 
            '${release_date}', 
            '${status}', 
            '${newTitle}', 
            ${vote_average}, 
            ${vote_count}
        );
    `;

    try {
        const result = await pgClient.query(pgQuery);
        return { result: result.rows[0] };
    } catch (error) {
        return { error: error.message };
    }
};

const getMoviesDBFilter = async (query) => {
    const options = [];
    const {
        page,
        per_page,
        adult,
        budget_min,
        budget_max,
        language,
        title,
        popularity_min,
        popularity_max,
        release_date_first,
        release_date_last,
        status,
        revenue_min,
        revenue_max,
    } = query;
    let pgQuery = 'SELECT * FROM movies ';
    try {
        if (adult) options.push(`movies.adult = ${adult}`);
        if (budget_min) options.push(`movies.budget > ${budget_min}`);
        if (budget_max) options.push(`movies.budget < ${budget_max}`);
        if (language) options.push(`movies.original_language ILIKE '%${language}%'`);
        if (popularity_min) options.push(`movies.popularity > ${popularity_min}`);
        if (popularity_max) options.push(`movies.popularity < ${popularity_max}`);
        if (release_date_first && release_date_last) options.push(`movies.release_date BETWEEN '${new Date(release_date_first).toDateString()}' AND '${new Date(release_date_last).toDateString()}`);
        if (status) options.push(`movies.status ILIKE '%${status}%'`);
        if (title) options.push(`movies.title ILIKE '%${title}%'`);
        if (revenue_min) options.push(`movies.vote_count > ${revenue_min}`);
        if (revenue_max) options.push(`movies.vote_count < ${revenue_max}`);
        if (options.length) {
            pgQuery += `WHERE ${options.join(' AND ')} `;
        }
        pgQuery += `ORDER BY id OFFSET ${(page - 1) * per_page} LIMIT ${per_page};`;
        const result = await pgClient.query(pgQuery);
        return { result: result.rows };
    } catch (error) {
        return { error: error.message };
    }
};

const getMoviesDBId = async (query) => {
    const { id } = query;
    try {
        let result = await pgClient.query(`SELECT *
        FROM movies
        JOIN movies_genres ON movies.id = movies_genres.movie_id
        JOIN genres ON movies_genres.genre_id = genres.id
        WHERE movies.id = ${id}`);
        result = getGenresArray(result.rows);
        return { result };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { setFilmsToDB, getMoviesDBId, getMoviesDBFilter };
