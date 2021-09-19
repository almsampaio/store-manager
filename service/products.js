const Joi = require('joi');

const products = require('../model/poducts');

const validateProduct = (product) => {
        const schema = Joi.object({
          name: Joi.string().min(5).required(),
          quantity: Joi.number().integer().required(),
        });
        return schema.validate(product);
};

const create = async (name, quantity) => {
    const { error } = validateProduct({ name, quantity });
    if (error) {
        return { statusCode: 422,
            json: { err: { code: 'invalid_data', message: error.details[0].message } } }; 
    }
    if (quantity < 1) {
       return { statusCode: 422,
        json: { err: { code: 'invalid_data',
       message: '"quantity" must be larger than or equal to 1' } } }; 
    }
    const validationName = await products.findProducts(name);
    if (validationName) {
         return { statusCode: 422,
            json: { err: { code: 'invalid_data', message: 'Product already exists' } } }; 
    }
    const result = await products.CreateProduct(name, quantity);
    return { statusCode: 201, json: result };
  };
module.exports = {
    create,
};