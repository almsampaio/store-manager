const SalesModels = require('../models/sales');
const validation = require('./salesValidations');
const ProductModels = require('../models/products');

const updateProduct = async (array, string) => {
  array.forEach(async (product) => {
    const { productId, quantity } = product;
    const fullProduct = await ProductModels.getById(productId);
    const { _id, name } = fullProduct;
    if (string === 'create') {
      await ProductModels.update(_id, name, (fullProduct.quantity - quantity));
    }
    if (string === 'delete') {
      await ProductModels.update(_id, name, (fullProduct.quantity + quantity));
    }
  });
};

const verifyStock = async (array) => {
  const itensSold = array[0];
  const product = await ProductModels.getById(itensSold.productId);
  if (itensSold.quantity > product.quantity) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }
};

const create = async (array) => {
  const validQuantity = validation.validateQuantity(array);
  if (validQuantity) return validQuantity;
  const verify = await verifyStock(array);
  if (verify) return verify;
  const sales = await SalesModels.create(array);
  await updateProduct(array, 'create');
  return sales.ops[0];
};

const getAll = async () => {
  const allSales = await SalesModels.getAll();
  const sales = allSales.map(({ _id, itensSold }) => ({ _id, itensSold }));
  return {
    sales,
  };
};

const getById = async (id) => {
  const sale = await SalesModels.getById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const { _id, itensSold } = sale;
  return {
    _id,
    itensSold,
  };
};

const update = async (id, array) => {
  const validQuantity = validation.validateQuantity(array);
  if (validQuantity) return validQuantity;
  const sale = await SalesModels.update(id, array);
  if (sale) {
    return {
      _id: id,
      itensSold: array,
    };
  }
};

const exclude = async (id) => {
  const fullSale = await SalesModels.getById(id);
  const sale = await SalesModels.exclude(id);
  if (!sale) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }
  await updateProduct(fullSale.itensSold, 'delete');
  return fullSale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
