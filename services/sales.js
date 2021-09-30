const { create, getSale, getSales, updateSale, deleteSale } = require('../db/models/sale');

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
  const sale = await getSale(id);
  if (!sale) throw new Error('Wrong id format');

  await updateSale(id, data);
  return { _id: id, itensSold: data };
}

async function deleteSaleService(id) {
  const sale = await getSale(id);
  await deleteSale(id);

  return { _id: id, itensSold: sale };
}

module.exports = { createService, listSalesService, updateSaleService, deleteSaleService };
