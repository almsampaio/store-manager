const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

function findIdExisting(arraySaleIdTypeds, arrayProductIdDB) {
  let find = false;
  arraySaleIdTypeds.forEach((idTyped) => {
      arrayProductIdDB.forEach((idDB) => {
        if (idDB === idTyped) find = true;
      });
  });
  return find;
}

function formatValidationInputProducts(product) {
  if (!product.name || !product.quantity) {
    return {
        err: {
          code: 'invalid_data',
          message: 'Wrong input format',
        },
        status: 422,
      };
  }
  return false;
}

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

function validateURLId(id) {
    if (!ObjectId.isValid(id) || !id) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
        status: 422,
      };
    }
    return false;
}

async function validationGetProductById(product) {
  if (product[0].length === 0) {
      return {
          err: {
            code: 'invalid_data',
            message: 'Wrong id format',
          },
          status: 422,
        };
    }
    return false;
}

async function productIdValidation(product) {
  const productsDB = await productsModel.getAllProdutcts();
  const arrayProductIdDB = productsDB.map(({ _id }) => _id.toString());
  const arraySaleIdTypeds = product.map(({ productId }) => productId);
  const find = findIdExisting(arraySaleIdTypeds, arrayProductIdDB);
  if (!find) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: 422,
    };
  }
  return false;
}

function formatValidationInputSales(sale) {
  if (!Array.isArray(sale)) {
    return {
        err: {
          code: 'invalid_data',
          message: 'Wrong input format',
        },
        status: 422,
      };
  }
  return false;
}

function quantityValidationSales(sale) {
  const invalidQuantity = sale
  .find(({ quantity }) => typeof quantity === 'string' || quantity <= 0);

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

async function productIdValidationSales(sale) {
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

function testNegativeQuantity(id, qtd, getProductsDB, _verb) {
  const productToUpdate = getProductsDB.map(({ _id, name, quantity }) => (
    { idProduct: _id.toString(), name, quantity }))
    .find((el) => el.idProduct === id);
  const subtract = productToUpdate.quantity - qtd;
  if (subtract < 0) {
    return {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
        status: 422,
      };
  }
  return false;
}

async function validateUpdateProductsQuantitys(sale, verb) {
  const getProductsDB = await productsModel.getAllProdutcts();
  if (verb === 'post' || verb === 'put') {
    const arrayGetToPossiblesNegativeQuantitys = sale
    .map(({ productId, quantity }) => {
      const testeAmountProduct = testNegativeQuantity(productId, quantity, getProductsDB, verb);
      return testeAmountProduct;
    });

  const error = arrayGetToPossiblesNegativeQuantitys
    .find((element) => element !== false);

  if (error) return error;
  }
  return false;
}

module.exports = {
  formatValidationInputProducts,
  nameLengthValidation,
  isRepeated,
  quantityValidationProducts,
  quantityTypeValidationProducts,
  validationGetProductById,
  productIdValidation,
  validateURLId,
  formatValidationInputSales,
  quantityValidationSales,
  productIdValidationSales,
  validateUpdateProductsQuantitys,
};
