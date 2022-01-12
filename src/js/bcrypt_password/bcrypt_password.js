const bcrypt = require('bcrypt');

const hashPassword = async (password) => bcrypt.hash(password, 10);

const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

module.exports = {
    hashPassword,
    comparePassword,
};
