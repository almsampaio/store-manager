const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().required().integer().min(1),
});

function validate(request, response, next) {
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: error.message,
      },
    });
  }
  next();
}

module.exports = validate;
