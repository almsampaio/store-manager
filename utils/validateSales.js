const Joi = require('joi');
const invalid = require('./InvalidData');

const validadeSale = (dataArray, res) => {
  dataArray.forEach((sale) => {
    const { error } = Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
      .validate(sale);
    
    if (error) {
      const errorMsg = 'Wrong product ID or invalid quantity';
      const invalidJson = invalid.InvalidData(errorMsg);
      return res.status(422).json(invalidJson);
    }
  });
};

module.exports = validadeSale;