const { Client } = require('pg');

const pgClient = new Client({
    user: 'ratroian',
    host: 'localhost',
    database: 'project',
    password: '300493',
    port: 5432,
});

pgClient
    .connect()
    .then(() => console.log('DATABASE CONNECTED!'))
    .catch((error) => console.log('DATABASE CONNECTED ERROR!', error.message));

module.exports = pgClient;
