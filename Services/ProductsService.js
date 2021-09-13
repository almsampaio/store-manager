const { insertOneProduct, findOneProduct } = require('../Models/ProductsModel');

const INVALID_NAME_LENGTH = {
  response: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  code: 422,
};

const INVALID_NAME_REPEATING = {
  response: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  code: 422,
};

const INVALID_QUANTITY_TYPE = {
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
  code: 422,
};

const INVALID_QUANTITY_AMOUNT = {
  response: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  code: 422,
};

async function productNameValidator(name) {
  if (!name || name.length < 5) return INVALID_NAME_LENGTH;
  const isNameRepeating = await findOneProduct(name);
  if (isNameRepeating) return INVALID_NAME_REPEATING;
  return 0;
}

function productQuantityValidator(quantity) {
  if (!quantity && quantity !== 0) return INVALID_QUANTITY_TYPE;
  if (typeof quantity !== 'number') return INVALID_QUANTITY_TYPE;
  if (quantity <= 0) return INVALID_QUANTITY_AMOUNT;
  return 0;
}

async function validateProductFields({ name, quantity }) {
  const validateName = await productNameValidator(name);
  const validateQuantity = productQuantityValidator(quantity);
  if (validateName.response) return validateName;
  if (validateQuantity.response) return validateQuantity;
  return 0;
}

async function productRegistration(productToAdd) {
  const validateProduct = await validateProductFields(productToAdd);
  if (validateProduct.response) return validateProduct;
    const newProduct = await insertOneProduct(productToAdd);
    return { response: newProduct, code: 201 };
}

module.exports = productRegistration;
