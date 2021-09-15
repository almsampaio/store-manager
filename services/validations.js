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

async function isNameRepeated(name) {
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

async function validationsNameProduct(name) {
  if (nameLengthValidation(name)) return nameLengthValidation(name);
  if (isNameRepeated(name)) return isNameRepeated(name);
  return false;
}

function validationValueInsertQuantityProducts(quantity) {
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

function validationQuantityTypeInsertProducts(quantity) {
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

function validationsQuantityInsertProduct(quantity) {
  if (validationValueInsertQuantityProducts(quantity)) {
    return validationValueInsertQuantityProducts(quantity);
  }

  if (validationQuantityTypeInsertProducts(quantity)) {
    return validationQuantityTypeInsertProducts(quantity);
  }
}

async function validateURLId(id) {
  const objMessageInvalidData = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
    status: 422,
  };
  if (!ObjectId.isValid(id) || !id) {
    return objMessageInvalidData;
  }

  const getProductById = await productsModel.getProductById(id);
  if (getProductById.length === 0) {
    return objMessageInvalidData;
  }
  return getProductById;
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
  validationsNameProduct,
  validationsQuantityInsertProduct,
  productIdValidation,
  validateURLId,
  formatValidationInputSales,
  quantityValidationSales,
  productIdValidationSales,
  validateUpdateProductsQuantitys,
};
