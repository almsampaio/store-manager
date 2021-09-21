const Joi = require('joi');
const { UNPROCESSABLE_ENTITY } = require('../utils/HttpStatusCodes');

const ProductSchema = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

const validateSale = (req, res, next) => {
  const sale = req.body;
  const { error } = ProductSchema.validate(sale);

  if (error) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      }); 
  }
  
  next();  
};

module.exports = validateSale;