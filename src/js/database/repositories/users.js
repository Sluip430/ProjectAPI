const { password } = require('pg/lib/defaults');
const pgClient = require('../database');

const createDBUser = async (body) => {
    const { login , password , first_name, last_name } = body;
    try {
        const result = await pgClient.query(`INSERT INTO users (login , password, first_name , last_name) VALUES ('${login}' , '${password}', '${first_name}', '${last_name}');`);
        return { result: result.rows[0] };
    } catch (e) {
        return { error: e.message }
    }
};

const logInDBUser = async (login) => {
    try {
        const result = await pgClient.query(`SELECT * FROM users WHERE login = '${login}' `);
        return { result: result.rows[0] };
    } catch (error) {
        return { error };
    }
};

module.exports = { createDBUser, logInDBUser };