const Joi = require('@hapi/joi');

const model = require('../models/Products');

const UNPROCESSABLE_ENTITY = 422;
const MIN_NAME_LENGTH = 5;

const validateProduct = Joi.object({
  name: Joi.string().min(MIN_NAME_LENGTH).required(),
  quantity: Joi.number().min(1).required(),
});

const readAll = async () => {
  const products = await model.readAll();

  return products;
};

const readById = async (id) => {
  const product = await model.readById(id);

  if (!product) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
    };
  }

  return product;
};

const objectError = {
  status: UNPROCESSABLE_ENTITY,
  code: 'invalid_data',
};

const create = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });
  const allProducts = await readAll();
  
  if (error) { 
     objectError.error = error;
     return objectError;
  //   return {
  //     status: UNPROCESSABLE_ENTITY,
  //     code: 'invalid_data',
  //     error,
  //   };
  }

  const isNameUsed = allProducts.some((product) => product.name === name);

  if (isNameUsed) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Product already exists' },
    };
  }

  const newProduct = model.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) { 
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error,
    };
  }

  const updateProduct = await model.update(id, name, quantity);

  return updateProduct;
};

const destroy = async (id) => {
  const productDeleted = await model.destroy(id);

  if (!productDeleted) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
    };
  }

  return productDeleted;
};

module.exports = {
  create,
  readAll,
  readById,
  update,
  destroy,
}; 