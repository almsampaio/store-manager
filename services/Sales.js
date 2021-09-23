const {
  create,
  getAll,
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
module.exports = {
  createSales,
  getAllSales,
};
