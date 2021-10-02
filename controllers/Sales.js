// const { ObjectId } = require('mongodb');
const Sales = require('../services/Sales');

async function createSales(req, res) {
  const sales = [...req.body];
  const createdSales = await Sales.createSales(sales);

  res.status(200).json(createdSales);
}

async function getSales(_req, res) {
  const sales = await Sales.getSales();

  res.status(200).json({ sales });
}

async function getSaleById(req, res, next) {
  const { id } = req.params;

  const sale = await Sales.getSaleById(id);

  if (!sale) {
    return next({ status: 404, code: 'not_found', message: 'Sale not found' });
  }

  res.status(200).json(sale);
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
};
