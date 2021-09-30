const { create, getSale, getSales, updateSale } = require('../db/models/sale');

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

async function updateSaleService(id, data) {
  console.log(data);
  const sale = await getSale(id);
  if (!sale) throw new Error('Wrong id format');

  await updateSale(id, data);
  return { _id: id, itensSold: data };
}

module.exports = { createService, listSalesService, updateSaleService };
