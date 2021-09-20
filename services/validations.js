const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const {
  WRONG_INPUT_FORMAT_MESSAGE,
  WRONG_NAME_LENGTH_MESSAGE,
  NAME_ALREADY_EXISTS_MESSAGE,
  WRONG_QUANTITY_VALUE_SIZE_MESSAGE,
  WRONG_QUANTITY_INPUT_TYPE_MESSAGE,
  WRONG_ID_FORMAT_MESSAGE,
  WRONG_PRODUCID_OR_INVALID_QUANTIY_MESSAGE,
  NOT_AMOUNT_PERMISE_TO_SELL_MESSAGE,
  SALE_NOT_FOUND,
  // WRONG_SALE_ID_FORMAT_MESSAGE,
} = require('./objectsMessagesErros');

function findIdExisting(arraySaleIdTypeds, arrayProductIdDB) {
  let find = false;
  arraySaleIdTypeds.forEach((idTyped) => {
      arrayProductIdDB.forEach((idDB) => {
        if (idDB === idTyped) find = true;
      });
  });
  return find;
}

function validationNameLength(name) {
  if (name === undefined) return WRONG_INPUT_FORMAT_MESSAGE;
  if (name.length < 5) {
    return WRONG_NAME_LENGTH_MESSAGE;
  }
  return false;
}

async function validationIsNameRepeated(name) {
  const allProducts = await productsModel.getAllProdutcts();
  const { products } = allProducts;
  const isUsed = products.find((product) => product.name === name);
  if (isUsed) {
    return NAME_ALREADY_EXISTS_MESSAGE;
  }
  return false;
}

async function validationNameByPost(name) {
  const validation = await validationIsNameRepeated(name);
  if (validation) return validation;
  return false;
}

async function validationNameByPut(name, id) {
  const validation = await validationIsNameRepeated(name);
  if (validation) {
    const getProductById = await productsModel.getProductById(id);
    const nameCurrentltProduct = getProductById.name;
    if (nameCurrentltProduct !== name) return validationIsNameRepeated(name);
    return false;
  }
  return false;
}

async function validationsNameRepeatByVerbs(name, id, verb) {
  if (verb === 'post') {
    const validationByPost = await validationNameByPost(name);
    if (validationByPost) return validationByPost;
  }

  const validationByPut = await validationNameByPut(name, id);
  if (validationByPut) return validationByPut;

  return false;
}

async function validationsNameProduct(verb, name, id) {
  if (validationNameLength(name)) return validationNameLength(name);

  const validationRepeatedName = await validationsNameRepeatByVerbs(name, id, verb);
  if (validationRepeatedName) return validationRepeatedName;

  return false;
}

function validationValueInsertQuantityProducts(quantity) {
  if (quantity <= 0) {
    return WRONG_QUANTITY_VALUE_SIZE_MESSAGE;
  }
  return false;
}

function validationQuantityTypeInsertProducts(quantity) {
  if (typeof quantity !== 'number') {
    return WRONG_QUANTITY_INPUT_TYPE_MESSAGE;
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
  return false;
}

async function getItemById(id, item) {
  if (item === 'products') {
    const getProductById = await productsModel.getProductById(id);
    if (!getProductById) return SALE_NOT_FOUND;
    return false;
  }

  const getSaleById = await salesModel.getSaleById(id);
    if (!getSaleById) { return SALE_NOT_FOUND; }
  return false;
}

async function validateURLId(id, item) {
  if (item === 'products' && !ObjectId.isValid(id)) {
    return WRONG_ID_FORMAT_MESSAGE;
  }
  return getItemById(id, item);
}

// async function productIdValidation(product) {
//   const productsDB = await productsModel.getAllProdutcts();
//   const arrayProductIdDB = productsDB.map(({ _id }) => _id.toString());
//   const arraySaleIdTypeds = product.map(({ productId }) => productId);
//   const find = findIdExisting(arraySaleIdTypeds, arrayProductIdDB);
//   if (!find) {
//     return WRONG_ID_FORMAT_MESSAGE;
//   }
//   return false;
// }

function validationFormatInputSales(sale) {
  if (!Array.isArray(sale)) {
    return WRONG_INPUT_FORMAT_MESSAGE;
  }
  return false;
}

function validatioQuantitySale(sale) {
  const invalidQuantity = sale
  .find(({ quantity }) => typeof quantity === 'string' || quantity <= 0);

  if (invalidQuantity) {
    return WRONG_PRODUCID_OR_INVALID_QUANTIY_MESSAGE;
  }
  return false;
}

async function productIdValidationSales(sale) {
  const allProducts = await productsModel.getAllProdutcts();
  const { products } = allProducts;
  const arrayProductIdDB = products.map(({ _id }) => _id.toString());
  const arraySaleIdTypeds = sale.map(({ productId }) => productId);
  const find = findIdExisting(arraySaleIdTypeds, arrayProductIdDB);
  if (!find) {
    return WRONG_PRODUCID_OR_INVALID_QUANTIY_MESSAGE;
  }
  return false;
}

function testNegativeQuantity(id, qtd, getProductsDB) {
  const productToUpdate = getProductsDB.map(({ _id, name, quantity }) => (
    { idProduct: _id.toString(), name, quantity }))
    .find((el) => el.idProduct === id);

  const subtract = productToUpdate.quantity - qtd;
  if (subtract < 0) {
    return NOT_AMOUNT_PERMISE_TO_SELL_MESSAGE;
  }

  return false;
}

async function validateUpdateProductsQuantitys(sale, verb) {
  const allProducts = await productsModel.getAllProdutcts();
  const { products } = allProducts;
  if (verb === 'post' || verb === 'put') {
    const arrayGetToPossiblesNegativeQuantitys = sale
    .map(({ productId, quantity }) => {
      const testeAmountProduct = testNegativeQuantity(productId, quantity, products);
      return testeAmountProduct;
    });

  const error = arrayGetToPossiblesNegativeQuantitys
    .find((element) => element !== false);

  if (error) return error;
  }
  return false;
}

module.exports = {
  validationsNameProduct,
  validationsQuantityInsertProduct,
  // productIdValidation,

  validateURLId,

  validationFormatInputSales,
  validatioQuantitySale,
  productIdValidationSales,
  validateUpdateProductsQuantitys,
};
