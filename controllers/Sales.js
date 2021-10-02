const { ObjectId } = require('mongodb');
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

async function editSale(req, res) {
  const { id } = req.params;
  const items = [...req.body];

  const editedSale = await Sales.editSale(new ObjectId(id), items);

  res.status(200).json(editedSale);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const deletedSale = Sales.deleteSale(id);

  res.status(200).json(deletedSale);
}

module.exports = {
  createSales,
  getSales,
  getSaleById,
  editSale,
  deleteSale,
};
