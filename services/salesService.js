const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const minimumQuantity = 1;

const quantityError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const stockError = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const productId = async (itensSold) => {
  const prodId = itensSold.map((item) => item.productId);
  return prodId;
};

const productAvailable = async (itensSold) => {
  const prodId = await productId(itensSold);
  
  const quantities = await Promise.all(prodId.map(async (id) => {
    const product = await productsModel.getById(id);
    const quantity = { prodQty: product.quantity };
    return quantity;
  }));

  const sldQty = itensSold.map((item) => {
    const qty = item.quantity;
    const sQty = { soldQty: qty };
    return sQty;
  });

  const result = [quantities, sldQty].reduce((a, b) => a.map((c, i) => ({ ...c, ...b[i] })));
  // https://stackoverflow.com/questions/46849286/merge-two-array-of-objects-based-on-a-key

  const verification = result.every((res) => {
    if (res.prodQty <= res.soldQty) {
      return true;
    } return false;
  });

  return verification;
};

const quantityValidation = async (itensSold) => {
  const validation = await itensSold.every((item) => {
    if (item.quantity < minimumQuantity 
      || typeof (item.quantity) === 'string') {
      return true;
    } return false;
  });
  return validation;
};

const create = async (itensSold) => {
  if (await quantityValidation(itensSold) === true) {
    return quantityError;
  } if (await productAvailable(itensSold) === true) {
    return { error: stockError };
  } 

  const sale = await salesModel.create(itensSold);
  return ({ sale });
};

const editById = async (id, itensSold) => {
  const [{ quantity }] = itensSold;

  if (quantity < minimumQuantity || typeof (quantity) === 'string') return quantityError;

  const sale = await salesModel.editById(id, itensSold);
  return { sale };
};

const deleteById = async (id) => {
  const sale = await salesModel.deleteById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
