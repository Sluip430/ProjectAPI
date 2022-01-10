const validators = require('./validation');
const { createDBUser, logInDBUser } = require('../database/repositories/users');
const { hashPassword, comparePassword } = require('../bcrypt_password/bcrypt_password');
const { generateToken } = require('../helpers/jsonwebtoken');

const createUser = async (body) => {
    const { value, error } = validators.validate(body, validators.userSignUpValidation);
    if (error) return { status: 400, error };

    const hashedPassword = await hashPassword(value.password);
    const newBody = { ...value, password: hashedPassword };
    const { error: dbError, result } = await createDBUser(newBody);
    if (dbError) return { status: 500, data: { message: dbError } };

    return { status: 201, result };
};

const logIn = async (body) => {
    const { value, error } = validators.validate(body, validators.userSignInValidation);
    if (error) return { status: 400, error };

    const { login, password } = value;
    const { error: dbError, result } = await logInDBUser(login);
    if (dbError) return { status: 500, data: dbError.message };
    if (!result) return { status: 403, data: { message: 'Login or password is invalid!' } };

    const { password: hash, id, first_name, last_name } = result;
    const isValidPassword = await comparePassword(password, hash);
    const jwtToken = generateToken({ first_name, last_name, login });
    if (isValidPassword) {
        return {
            status: 200,
            data: { id, first_name, last_name, login },
            token: jwtToken,
        };
    }

    return { status: 403, result: { data: 'Login or password is invalid!' } };
};

module.exports = {
    createUser,
    logIn,
};