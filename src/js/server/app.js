const http = require('http');
const { router } = require('../router/router');
const host = 'localhost';
const port = 3001;

const requestListener = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
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

        res.on('error', (err) => {
            console.error(err);
            res.statusCode = 500;
            res.end(JSON.stringify(err));
          });
    };

    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });