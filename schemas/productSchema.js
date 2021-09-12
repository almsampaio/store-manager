// refatorando o codigo de validação com ajuda do Lucas Lara

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const productValidate = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const idValidate = Joi.objectId();

module.exports = {
  productValidate,
  idValidate,
}
