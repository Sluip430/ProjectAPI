const validators = require('./validation');
const { createDBUser, logInDBUser } = require('../database/repositories/users');
const { hashPassword, comparePassword } = require('../bcrypt_password/bcrypt_password');
const { generateToken } = require('../helpers/jsonwebtoken');

const createUser = async (body) => {
    // const { value, error } = validators.validate(body, validators.userValidation);
    // if (error) return { error };

    const hashedPassword = await hashPassword(body.password);
    const newBody = { ...body, password: hashedPassword };
    console.log(newBody);
    const { error: dbError, result } = await createDBUser(newBody);
    if (dbError) return { status: 500, result: dbError.message };

    return { status: 201, result };
};

const logIn = async (body) => {
    // const { error, value } = schemaLogInUser.validate(body);
    // if (error) return { status: 400, result: { message: error.message } };

    const { login, password } = body;
    const { error: dbError, result } = await logInDBUser(login);
    if (dbError) return { status: 500, result: dbError.message };

    const { password: hash, id, first_name, last_name } = result;
    const isValidPassword = await comparePassword(password, hash);
    const jwtToken = generateToken({ first_name, last_name, login });
    if (isValidPassword) {
        return {
            status: 200,
            result: { id, first_name, last_name, login },
            token: jwtToken,
        };
    }

    return { status: 403, result: { message: 'Login or password is invalid!' } };
};

module.exports = {
    createUser,
    logIn,
};