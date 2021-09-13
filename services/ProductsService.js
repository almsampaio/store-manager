const ProductsModel = require('../models/ProductsModel');

const productAlreadyExists = async (name) => {
  const foundProduct = await ProductsModel.findByName(name);

  if (foundProduct.length > 1) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return true;
};

const isNameValid = (name) => {
  const FIVE = 5;

  if (name.length < FIVE) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  return true;
};

const isQuantityValid = (quantity) => {
  const ZERO = 0;

  if (quantity <= ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  return true;
};

const create = async (name, quantity) => {
  const newProduct = await ProductsModel.create(name, quantity); // Interação com o Model
  const productExists = await productAlreadyExists(name);
  const nameValid = isNameValid(name);
  const quantityValid = isQuantityValid(quantity);

  if (productExists.err) return productExists;
  if (nameValid.err) return nameValid;
  if (quantityValid.err) return quantityValid;

  return newProduct;
};

module.exports = {
  create,
};
