const { create, getSale, getSales } = require('../db/models/sale');

async function createService(data) {
  const addSale = await create(data);
  return addSale;
}

async function listSalesService(id) {
  if (id) {
    const sale = await getSale(id);
    if (!sale) throw new Error('Wrong id format');
    return sale;
  }
  const sales = await getSales();
  return sales;
}

module.exports = { createService, listSalesService };
