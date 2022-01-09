const jwt = require('jsonwebtoken');

const privateKey = '1gf5-123f-asd3';

const generateToken = (body) => jwt.sign(body, privateKey,{ expiresIn: '2h' });

const checkToken = (token) => jwt.verify(token, privateKey);

module.exports = {
    generateToken,
    checkToken,
};
