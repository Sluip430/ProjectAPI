const pgClient = require('../database');

const createDBUser = async (body) => {
    const {
        login, password, first_name, last_name,
    } = body;
    try {
        await pgClient.query(`INSERT INTO users (login , password, first_name , last_name) VALUES ('${login}' , '${password}', '${first_name}', '${last_name}');`);
        return { result: 'Insert successful' };
    } catch (error) {
        return { error: error.message };
    }
};

const logInDBUser = async (login) => {
    try {
        const result = await pgClient.query(`SELECT * FROM users WHERE login = '${login}' `);
        return { result: result.rows[0] };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = { createDBUser, logInDBUser };
