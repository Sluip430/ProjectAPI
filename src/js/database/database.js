const { Client } = require('pg');

const pgClient = new Client({
    user: 'duhenets',
    host: 'localhost',
    database: 'kinoBD',
    password: 'password',
    port: 5432,
});

pgClient.connect().then(() => console.log("Connected"));

module.exports = pgClient;
