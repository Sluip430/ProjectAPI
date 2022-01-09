const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

module.exports = {
    hashPassword,
    comparePassword,
};
