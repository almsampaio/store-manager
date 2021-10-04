const constants = require('../constants');

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => (value.message));
    const [errorMessage] = errorDetails; 
    return errorMessage;
  }
  return null;
};

module.exports.validateBody = (schema) => ((req, res, next) => {
  const response = { ...constants.defaultServerResponse };
  const error = validateObjectSchema(req.body, schema);
  if (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = error;
    return res.status(response.status).send(response);
  }
  return next();
});