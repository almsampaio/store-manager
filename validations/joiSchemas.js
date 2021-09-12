const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.product = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

// exports.id = Joi.string().length(24).alphanum().required();
// semelhante ao usar o  ObjectId.isValid(algumacoisa) - Anotações para fins didáticos
exports.id = Joi.objectId(); // verifica se é um ID válido de MongoDB e não se existe no banco de dados

exports.sale = Joi.array().items({
  productId: Joi.objectId(),
  quantity: Joi.number().min(1).required(),
});
