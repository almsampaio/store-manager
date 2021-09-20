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

  const getAllProducts = async () => {
    const productsAll = await products.productsAll();
  
    return {
      statusCode: 200,
      json: {
        products: productsAll,
      },
    };
  };

  const getById = async (id) => {
    const result = await products.idProducts(id);
      
    if (!result) {
 return {
      statusCode: 422,
      json: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    }; 
}
  
    return {
      statusCode: 200,
      json: result[0],
    };
  };

  const updateProducts = async (id, name, quantity) => {
    const { error } = validateProduct({ name, quantity });
  
    if (error) {
         return {
      statusCode: 422,
      json: { err: { code: 'invalid_data', message: error.details[0].message } },
    }; 
    }
    if (quantity < 1) {
        return { statusCode: 422,
         json: { err: { code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1' } } }; 
     }
    const result = await products.update(id, name, quantity);
  
    return {
      statusCode: 200,
      json: result,
    };
  };

  const deleteProducts = async (id) => {
    const result = await products.deleteProducts(id);
  
    if (!result) {
 return {
      statusCode: 422,
      json: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    }; 
}
  
    return {
      statusCode: 200,
      json: result.message,
    };
  };
module.exports = {
    create,
    getAllProducts,
    getById,
    updateProducts,
    deleteProducts,
};