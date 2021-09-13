const rescue = require('express-rescue');
const SalesServices = require('../services/sales');

const create = rescue(async (req, res) => {
  const sales = req.body;
  const createSales = await SalesServices.create(sales);
  if (createSales.err) return res.status(422).json(createSales);
  res.status(200).json(createSales);
});

module.exports = {
  create,
};