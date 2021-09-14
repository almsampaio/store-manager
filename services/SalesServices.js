const Joi = require('joi');
const { searchIds } = require('../models/ProductsModel');

const message = 'Wrong product ID or invalid quantity';

const saleSchema = Joi.object({
  quantity: Joi.number().integer().greater(0).required()
  .error(new Error(message)),
});

const validateJoi = (productsSold) => {
  const joiValidate = productsSold.map((product) => saleSchema
    .validate({ quantity: parseInt(product.quantity, 10) }));
    joiValidate.forEach((item) => {
      const { error } = item;

      if (error) throw new Error(error.message);
  });
};

const validateProductIds = async (productsSold) => {
  const itemsIds = productsSold.map((item) => item.productId);
  const ids = await searchIds(itemsIds);

  let isValid = true;

  itemsIds.forEach((id) => {
    if (!ids.includes(id)) {
      isValid = false;
    }
  });

  if (!isValid) throw new Error(message);

  return true;
};

module.exports = {
  validateProductIds,
  validateJoi,
};
