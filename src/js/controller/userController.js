const validators = require('./validation');
const { createDBUser, logInDBUser } = require('../database/repositories/users');
const { hashPassword, comparePassword } = require('../bcrypt_password/bcrypt_password');
const { generateToken } = require('../helpers/jsonwebtoken');

const createUser = async (body) => {
    // const { value, error } = validators.validate(body, validators.userSignUpValidation);
    // if (error) return { error: { status: 400, data: error.message } };

    const hashedPassword = await hashPassword(body.password);
    const newBody = { ...body, password: hashedPassword };
    const { error: dbError, result } = await createDBUser(newBody);

    if (dbError) return { error: { status: 500, data: dbError } };
    return { result: { data: result, status: 201 } };
};

const logIn = async (body) => {
    // const { value, error } = validators.validate(body, validators.userSignInValidation);
    // if (error) return { error: { status: 400, message: error.message } };

    const { login, password } = body;
    const { error: dbError, result } = await logInDBUser(login);
    if (dbError) return { error: { status: 500, message: dbError } };
    if (!result) return { error: { status: 403, message: 'Login or password is invalid!' } };

    const {
        password: hash,
        id, first_name,
        last_name,
    } = result;

    const isValidPassword = await comparePassword(password, hash);
    const jwtToken = generateToken({ first_name, last_name, login });
    if (!isValidPassword) return { error: { status: 403, message: 'Login or password is invalid!' } };

    return {
        result: {
            status: 200,
            data: {
                id,
                first_name,
                last_name,
                login,
            },
            token: jwtToken,
        },
    };
};

module.exports = {
    createUser,
    logIn,
};
