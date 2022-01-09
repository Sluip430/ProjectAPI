const pgClient = require('../database');

const createUniver = async (name) => {
    try {
        const univer = await pgClient.query(`INSERT INTO universities (name) VALUES ('${name}');`);
        return { result: "Create sucsesful!" };
    } catch (e) {
        return { error: e.message }
    }
};

const getUniver = async (id) => {
    try {
        const univer = await pgClient.query(`SELECT * FROM universities WHERE id = ${id};`);
        if (univer.rowCount === 0) throw ({message : "Query Is Empty"});
        return { result: univer.rows[0] };
    } catch (e) {
        return { error: e.message }
    }
};

const getUniverList = async (value) => {
    const {page, perPage, name} = value;
    try {
        const result = await pgClient.query(`SELECT * FROM universities WHERE name ILIKE '%${name}%' ORDER BY id OFFSET ${(page - 1) * perPage} LIMIT ${perPage};`);
        return { result: result.rows };
    } catch (e) {
        return { error: e.message }
    }
};

module.exports = { createUniver , getUniver, getUniverList };