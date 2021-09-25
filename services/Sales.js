const {
  create,
  getAll,
  getById,
  update,
  deleteSales,
} = require('../models/Sales');

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

const createSales = async (sale) => {
  const result = await create(sale);
  const verifySaleQuan = verifySale(sale);

  if (verifySaleQuan) return verifySale(sale);

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

  return result;
};

const deleteSal = async (id) => {
  const sale = await deleteSales(id);

  if (!sale) {
    return { err: { code: 'invalid_data', message: 'Wrong sale ID format' }, status: 422 };
  }
  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSalesById,
  deleteSal,
};
