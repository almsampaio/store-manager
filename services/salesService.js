const salesModel = require('../models/salesModel');

const {
  invalidData,
//   saleExists,
//   minimumQty,
//   qtyMustBeANumber,
//   wrongIdFormat,
//   nameMinimumLength,
  problemIdOrQty,
  // notFound,
  // saleNotFound,
  wrongSaleIdFormat,
  // amountNotpermitted,
  // stockProblem,
} = require('../utils/errorMessage');

  const {
    HTTP_OK_STATUS,
    // HTTP_CREATED_STATUS,
    HTTP_NO_BODY_STATUS,
  } = require('../utils/httpStatus');

const getAll = async () => {
    const sales = await salesModel.getAll();
    return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

// Dica para verificar quantidades vista no repositório do 
// Felipe Flores - já informado
const create = async (array) => {
    const checkSize = array.find((item) => item.quantity < 1);
    const checkType = array.find((item) => typeof item.quantity !== 'number');
    if (checkType) {
      return { err: { code: invalidData, message: problemIdOrQty } };
    }
  if (checkSize) {
    return { err: { code: invalidData, message: problemIdOrQty } };
  }
  const saleCreated = await salesModel.create(array);
  return { saleCreated };
};

const actualize = async (id, sale) => {
  const checkSize = sale.find((item) => item.quantity < 1);
  const checkType = sale.find((item) => typeof item.quantity !== 'number');
  if (checkType) {
    return { err: { code: invalidData, message: problemIdOrQty } };
  }
if (checkSize) {
  return { err: { code: invalidData, message: problemIdOrQty } };
}
  const updatedData = await salesModel.updateById(sale, id);
  if (!updatedData) return ({ err: { code: invalidData, message: wrongSaleIdFormat } });
  return updatedData;
};

const remove = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) return { status: HTTP_NO_BODY_STATUS, message: wrongSaleIdFormat };
  const sale = await salesModel.remove(id);
  return { status: HTTP_OK_STATUS, sale };
};

module.exports = { 
  create,
  getAll,
  getById,
  actualize,
  remove,
};
