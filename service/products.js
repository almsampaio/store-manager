const Joi = require('joi');

const products = require('../model/poducts');

const validateProduct = (product) => {
        const schema = Joi.object({
          name: Joi.string().min(5).required(),
          quantity: Joi.number().integer().min(1).required(),
        });
        return schema.validate(product);
};
const verifyName = async (name) => {
    const result = products.findProducts(name);
    return result;
  };

const create = async (name, quantity) => {
    const { error } = validateProduct({ name, quantity });
    if (error) {
 return {
      json: {
        err: { code: 'invalid_data', message: error.details[0].message } },
    }; 
}
    const validationName = await verifyName(name);
if (validationName) {
 return {
      json: {
        err: { code: 'invalid_data', message: 'Product already exists',
        },
      },
    }; 
}
    const result = await products.CreateProduct(name, quantity);
    return { json: result };
  };
module.exports = {
    create,
};