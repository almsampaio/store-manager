const {
  create,
  getAll,
  getById,
  update,
  deleteSales,
} = require('../models/Sales');

const {
  getProductId,
  updateProduct,
} = require('../models/Products');

const verifySale = (sales) => {
  const bool = sales
    .some((sale) => Math.sign(sale.quantity) === -1 || Math.sign(sale.quantity) === 0);

  const boolNumber = sales
    .some((sale) => typeof sale.quantity !== 'number');
  
  if (bool || boolNumber) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
  status: 422 };
  }

  return false;
};

const updateProductQuantity = async (id, quantity, name) => {
  const getProduct = await getProductId(id);
  const quantityUpdated = getProduct.quantity - quantity;
  if (quantityUpdated < 0) {
    return { err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    status: 404 };
  }
  await updateProduct(name, quantityUpdated, id);
};

const updateProductQuantityForDelete = async (id, quantity, name) => {
  const getProduct = await getProductId(id);
  const quantityUpdated = getProduct.quantity + quantity;
  if (quantityUpdated < 0) {
    return { err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    status: 404 };
  }
  await updateProduct(name, quantityUpdated, id);
};

const createSales = async (sale) => {
  const result = await create(sale);
  const verifySaleQuan = verifySale(sale);
  const { name } = await getProductId(sale[0].productId);
  const updateProductq = await updateProductQuantity(sale[0].productId, sale[0].quantity, name);

  if (verifySaleQuan) return verifySale(sale);

  if (typeof updateProductq === 'object') {
    return updateProductq;
  }
  await updateProductq;

  return result;
};

const getAllSales = async () => {
  const result = await getAll();
  return result;
};

const getSaleById = async (id) => {
  const result = await getById(id);

  if (!result) {
    return { err: { code: 'not_found', message: 'Sale not found' },
  status: 404 };
  }

  return result;
};

const updateSalesById = async (sale, id) => {
  const verifySaleQuan = verifySale(sale);
  const result = await update(sale, id);

  if (verifySaleQuan.err) return verifySale(sale);

  const { name } = await getProductId(sale[0].productId);
  const updateProductq = await updateProductQuantity(sale[0].productId, sale[0].quantity, name);

  if (verifySaleQuan) return verifySale(sale);

  if (typeof updateProductq === 'object') {
    return updateProductq; 
  }
  await updateProductq;

  return result;
};

const deleteSal = async (id) => {
  const saleObj = await getById(id);
  const sale = await deleteSales(id);

  if (!sale) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' }, status: 422 };
  }

  const idProduct = saleObj.itensSold[0].productId;
  const { name } = await getProductId(idProduct);
  const updateProductq = await updateProductQuantityForDelete(saleObj.itensSold[0].productId,
    saleObj.itensSold[0].quantity, name);

  if (typeof updateProductq === 'object') {
    return updateProductq;
  }
  await updateProductq;

  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSalesById,
  deleteSal,
};
