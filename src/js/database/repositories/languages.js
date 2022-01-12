const pgClient = require('../database');

const setLanguageToDB = async (query) => {
    const values = query.map((language) => `('${language.iso_639_1}', '${language.english_name}')`);

    const pgQuery = `
        INSERT INTO languages (short_name, long_name)
        VALUES ${values.join(',')};
    `;

    try {
        await pgClient.query(pgQuery);
        return { result: 'Insert successful' };
    } catch (error) {
        return { error: error.message };
    }
};

const getLanguagesDB = async (query) => {

    const pgQuery = `
        SELECT long_name
        FROM languages;
    `;

    try {
        const result = await pgClient.query(pgQuery);
        return { result: result.rows };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { setLanguageToDB, getLanguagesDB }