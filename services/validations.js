const productsModel = require('../models/productsModel');

function nameLengthValidation(name) {
  if (name.length < 5) {
    return {
        err: {
          code: 'invalid_data',
          message: '"name" length must be ate least 5 characters long',
        },
        status: 422,
      };
  }
  return false;
}

async function isRepeated(name) {
  const products = await productsModel.getAllProdutcts();
  const isUsed = products.find((product) => product.name === name);
  if (isUsed) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return false;
}

function quantityValidationProducts(quantity) {
  if (quantity <= 0) {
    return {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
  }
  return false;
}

function quantityValidationSales(sale) {
  const invalidQuantity = sale
  .find(({ quantity }) => typeof quantity !== 'number' || quantity <= 0);

  if (invalidQuantity) {
    return {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
  }
  return false;
}

module.exports = {
  nameLengthValidation,
  isRepeated,
  quantityValidationProducts,
  quantityValidationSales,
};
