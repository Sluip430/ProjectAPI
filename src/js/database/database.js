const { Client } = require('pg');

const pgClient = new Client({
    user: 'sluip',
    host: 'localhost',
    database: 'kinoBD',
    password: 's12122000',
    port: 5432,
});

pgClient.connect().then(() => console.log("Connected"));

module.exports = pgClient;
