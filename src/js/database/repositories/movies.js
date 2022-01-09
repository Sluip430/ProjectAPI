const pgClient = require('../database');

const setFilmsToDB = async (query) => {
    let { id, adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, status, title, vote_average, vote_count } = query;
    original_title = original_title.replace(/'/gi, '\'\'');
    title = title.replace(/'/gi, '\'\'');
    overview = overview.replace(/'/gi, '\'\'');
    try {
        const result = await pgClient.query(`INSERT INTO movies (id, adult, backdrop_path, budget, homepage, imdb_id, original_language, original_title, overview, popularity, poster_path, release_date, status, title, vote_average, vote_count)
        VALUES (${id}, ${adult}, '${backdrop_path}', ${budget}, '${homepage}', '${imdb_id}', '${original_language}', '${original_title}', '${overview}', ${popularity}, '${poster_path}', '${release_date}', '${status}', '${title}', ${vote_average}, ${vote_count});`);
        return { result: result.rows[0] };
    } catch (e) {
        return { error: e.message }
    }
};

const getMoviesDBFilter = async (query) => {
    const options = [];
    const { page, per_page, adult, budget, original_language, overview, popularity, release_date, status, title, vote_average, vote_count } = query;
    let pgQuery = `SELECT * FROM movies `;
    try{
        if (adult) options.push(`movies.adult = ${adult}`);
        if (budget) options.push(`movies.budget = ${budget}`);
        if (original_language) options.push(`movies.original_language ILIKE '%${original_language}%'`);
        if (overview) options.push(`movies.overview ILIKE '%${overview}%'`);
        if (popularity) options.push(`movies.popularity = ${popularity}`);
        if (release_date) options.push(`movies.release_date ILIKE '%${release_date}%'`);
        if (status) options.push(`movies.status ILIKE '%${status}%'`);
        if (vote_average) options.push(`movies.vote_average = ${vote_average}`);
        if (vote_count) options.push(`movies.vote_count = ${vote_count}`);
        if (title) options.push(`movies.title ILIKE '%${title}%'`);
        if (options.length !== 0) {
            pgQuery += `WHERE ${options.join(' AND ')} `;
            options.length = 0;
        }
        pgQuery += `ORDER BY id OFFSET ${(page - 1) * per_page} LIMIT ${per_page};`;
        const result = await pgClient.query(pgQuery);
        return { result : result.rows };
    } catch (e) {
        return { error: e.message }
    }
}

const getMoviesDBId = async (query) => {
    const { id } = query;
    try {
        const result = await pgClient.query(`SELECT * from movies WHERE id = ${id}`);
        return { result: result.rows[0] };
    } catch (e) {
        return { error: e.message }
    }
}

module.exports = { setFilmsToDB, getMoviesDBId, getMoviesDBFilter };