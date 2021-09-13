const Joi = require('joi');

const createSaleValidation = (req, _res, next) => {
  const sales = req.body;

  const schema = sales;

  schema.forEach((sale) => {
    const { error } = Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    }).validate(sale);
  
    if (error) return next(error);
  });
  
  next();
};

module.exports = {
  createSaleValidation,
};