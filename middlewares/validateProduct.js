const Joi = require('joi');
const { UNPROCESSABLE_ENTITY } = require('../utils/HttpStatusCodes');

const ProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = ProductSchema.validate({ name, quantity });

  if (error) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({
        err: {
          code: 'invalid_data',
          message: error.details[0].message,
        },
      }); 
  }
  
  next();  
};

module.exports = validateProduct;