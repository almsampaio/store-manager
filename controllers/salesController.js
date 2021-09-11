const salesService = require('../services/salesService');

async function getAll() {
  const sales = await salesService.getAll();
  return sales;
}

async function addSales(req, res) {
  const { body: salesList } = req;

  const addedSales = await salesService.addSales(salesList);

  if (addedSales.message) return res.status(422).json({ err: addedSales });

  res.status(200).json(addedSales);
}

module.exports = {
  getAll,
  addSales,
};
