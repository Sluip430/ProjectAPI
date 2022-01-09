const pgClient = require('../database');

const createCourse = async (body) => {
    const {name, universitie_id, teacher_id} = body;
    try {
        const result = await pgClient.query(`INSERT INTO courses (name, universitie_id, teacher_id ) VALUES ('${name}', ${universitie_id}, ${teacher_id});`);
        return { result: result.rows[0] };
    } catch (e) {
        return { error: e.message }
    }
};

module.exports = { createCourse };