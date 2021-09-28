// const Joi = require('joi');
const constants = require('../constants');

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => (
      { error: value.message, path: value.path }));
    return errorDetails;
  }
  return null;
};

module.exports.validateBody = (schema) => ((req, res, next) => {
  const response = { ...constants.defaultServerResponse };
  const error = validateObjectSchema(req.body, schema);
  if (error) {
    response.body = error;
    response.message = constants.requestValidationMessage.BAD_REQUEST;
    return res.status(response.status).send(response);
  }
  return next();
});