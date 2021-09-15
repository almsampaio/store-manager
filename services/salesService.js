const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

// const teste = () => {
//   const infos = {
//     status: 422,
//     quantity: 10,
//   };
//   if (infos.status === 422 || !Number.isInteger(infos.quantity) || infos.quantity < 1) {
//     console.log('entrou');
//   } else { console.log('não entrou'); }
// };
// teste(); productExists.status === 422 ||

const isSaleValid = async (itensSold) => {
  const isValid = await itensSold.reduce(async (acc, item) => {
    const productExists = await productsService.findById(item.productId);
    if (productExists.status === 422 || !Number.isInteger(item.quantity) || item.quantity < 1) {
      return false;
    }
    return acc;
  }, true);
  return {
    errorInfo: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    },
    isValid,
  };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return {
    response: { sales },
    status: 200,
  };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) {
    return {
      response: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
      status: 404,
    };
  }
  return {
    response: sale,
    status: 200,
  };
};

const deleteById = async (id) => {
  const deletedSale = await salesModel.deleteById(id);
  return deletedSale;
};

const create = async (itensSold) => {
  const { isValid, errorInfo } = await isSaleValid(itensSold);
  if (!isValid) {
    return { response: errorInfo, status: 422 };
  }
  const saleCreated = await salesModel.create(itensSold);
  return { response: saleCreated, status: 200 };
};

const update = async (id, itensSold) => {
  const { isValid, errorInfo } = await isSaleValid(itensSold);
  if (!isValid) {
    return { response: errorInfo, status: 422 };
  }
  const { status, response } = await findById(id);
  if (status === 404) {
    return { response, status };
  }
  const saleUpdated = await salesModel.update(id, itensSold);
  return {
    response: saleUpdated,
    status: 200,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 