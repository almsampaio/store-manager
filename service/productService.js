const productModel = require('../model/productModel');

const nameMinimumLength = 5;
const minimumQuantity = 1;
const invalidData = 'invalid_data';
const nameLengthError = { err: 
  { code: invalidData, message: '"name" length must be at least 5 characters long' },
};
const minimumQuantityError = { err:
  { code: invalidData, message: '"quantity" must be larger than or equal to 1' },
};
const typeOfQuantityError = { err:
  { code: invalidData, message: '"quantity" must be a number' },
};
const productWithSameNameError = { err:
  { code: invalidData, message: 'Product already exists' },
};
const wrongIdError = { err:
  { code: invalidData, message: 'Wrong id format' },
};

const create = async (name, quantity) => {
  if (name.length < nameMinimumLength) return nameLengthError;
  if (quantity < minimumQuantity) return minimumQuantityError;
  if (typeof (quantity) !== 'number') return typeOfQuantityError;
  const productWithSameName = await productModel.findProductByName(name);
  if (productWithSameName) return productWithSameNameError;
  const insertedProduct = await productModel.create(name, quantity);
  return { product: insertedProduct };
};

const getAll = async () => productModel.getAll();

const getById = async (id) => {
 const productById = await productModel.getById(id);
 if (!productById) return wrongIdError;
 return { product: productById };
};

module.exports = {
  create,
  getAll,
  getById,
};
