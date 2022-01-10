exports.userSignInValidation = require('./users.validator').userSignInValidation;
exports.userSignUpValidation = require('./users.validator').userSignUpValidation;
exports.idValidation = require('./id.validator').idValidation;
exports.movieFilterValidation = require('./movie.validator').movieFilterValidation;

exports.validate = (data, schema) => {
  const result = schema.validate(data, { abortEarly: false });
  if (result.error) {
    const error = { status: 400, data: result.error.message };
    return { error };
  }
  return { value: result.value };
};