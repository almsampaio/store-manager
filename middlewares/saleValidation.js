const Joi = require('@hapi/joi');

const schema = Joi.array().items(Joi.object().keys({
  productId: Joi.string().required().alphanum(),
  quantity: Joi.number().required().integer().min(1),
}));

function validate(request, response, next) {
  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
}

module.exports = validate;
