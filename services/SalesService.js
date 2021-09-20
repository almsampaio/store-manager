const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

const productExists = async (id) => (await ProductsModel.getById(id) ? null : true);

const isQuantityValid = (quantity) => (quantity <= 0 || typeof quantity !== 'number' ? null : true);

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const create = async (productsList) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  if (!productExists(productsList[0].productId)) return error;
  if (!isQuantityValid(productsList[0].quantity)) return error;

  const newSale = await SalesModel.create(productsList);

  return newSale;
};

const getAll = async () => {
  const salesList = await SalesModel.getAll();

  return salesList;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const update = async (id, productsList) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  if (!isQuantityValid(productsList[0].quantity)) return error;
  const updatedSale = await SalesModel.update(id, productsList);

  return updatedSale;
};

/* Source: https://github.com/tryber/sd-09-store-manager/tree/ggaldino95-project-store-manager */
const remove = async (id) => {
  const removedSale = await SalesModel.remove(id);

  if (!removedSale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  return removedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
