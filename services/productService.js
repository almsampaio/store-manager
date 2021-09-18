const productsModel = require('../models/productsModel');

const {
  invalidData,
  productExists,
  minimumQty,
  qtyMustBeANumber,
  wrongIdFormat,
  nameMinimumLength,
  // problemIdOrQty,
  // notFound,
  // saleNotFound,
  // wrongSaleIdFormat,
  // amountNotpermitted,
  // stockProblem,
} = require('../utils/errorMessage');

  const {
    HTTP_OK_STATUS,
    // HTTP_CREATED_STATUS,
    HTTP_NO_BODY_STATUS,
  } = require('../utils/httpStatus');

const getAll = async () => {
    const products = await productsModel.getAll();
    return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  if (name.length < 6) {
    return { err: { code: invalidData, message: nameMinimumLength } };
  }
  if (quantity <= 0) {
    return { err: { code: invalidData, message: minimumQty } };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: invalidData, message: qtyMustBeANumber } };
  }
  const nameExists = await productsModel.findByName(name);
    if (nameExists) {
 return { err: {
    status: HTTP_NO_BODY_STATUS,
       code: invalidData,
message: productExists } };
}
  const productCreated = await productsModel.create(name, quantity);
  return { productCreated };
};

const actualize = async (name, quantity, id) => {
  if (name.length < 6) {
    return { err: { code: invalidData, message: nameMinimumLength } };
  }
  if (quantity <= 0) {
    return { err: { code: invalidData, message: minimumQty } };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: invalidData, message: qtyMustBeANumber } };
  }
  const updatedData = await productsModel.updateById(name, quantity, id);
  if (!updatedData) return ({ err: { code: invalidData, message: wrongIdFormat } });
  return updatedData;
};

const remove = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { status: HTTP_NO_BODY_STATUS, message: wrongIdFormat };
  const product = await productsModel.remove(id);
  return { status: HTTP_OK_STATUS, product };
};

module.exports = { 
  create,
  getAll,
  getById,
  actualize,
  remove,
};
