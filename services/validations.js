const productsModel = require('../models/productsModel');

function nameLengthValidation(name) {
  if (name.length < 5) {
    return {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
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
      status: 422,
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
        status: 422,
      };
  }
  return false;
}

function quantityTypeValidationProducts(quantity) {
  if (typeof quantity !== 'number') {
    return {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
        status: 422,
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
        status: 422,
      };
  }
  return false;
}

function findIdExisting(arraySaleIdTypeds, arrayProductIdDB) {
  let find = false;
  arraySaleIdTypeds.forEach((idTyped) => {
      arrayProductIdDB.forEach((idDB) => {
        if (idDB === idTyped) find = true;
      });
  });
  return find;
}

async function productIdValidationSales(sale) {
  // console.log('entroooooooooooooooooooooou no teste de repetido');
  const productsDB = await productsModel.getAllProdutcts();
  const arrayProductIdDB = productsDB.map(({ _id }) => _id.toString());
  const arraySaleIdTypeds = sale.map(({ productId }) => productId);
  const find = findIdExisting(arraySaleIdTypeds, arrayProductIdDB);
  if (!find) {
    return {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
        status: 422,
      };
  }
  return false;
}

module.exports = {
  nameLengthValidation,
  isRepeated,
  quantityValidationProducts,
  quantityTypeValidationProducts,
  quantityValidationSales,
  productIdValidationSales,
};
