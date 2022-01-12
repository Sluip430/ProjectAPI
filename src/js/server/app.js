const http = require('http');
require('../database/database');
const { router } = require('../router/router');

const HOSTNAME = 'localhost';
const PORT = 3001;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Content-Type', 'application/json, text/plain; charset=utf-8;');
    res.setHeader('Access-Control-Max-Age', '-1');
    res.setHeader('Access-Control-Expose-Headers', 'token');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        return res.end();
    }

    const buffer = [];
    req.on('data', (chunk) => {
        buffer.push(chunk);
    });

    req.on('end', async () => {
        const body = buffer.length === 0 ? null : JSON.parse(buffer);
        await router({ req, res, body });
    });

    res.on('error', (error) => {
        res.statusCode = 500;
        res.end(JSON.stringify(error));
    });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
