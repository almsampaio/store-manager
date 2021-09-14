const rescue = require('express-rescue');
const { salesServices } = require('../services');
const { status } = require('../schema');

const registerSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const registerItens = await salesServices.registerSalesServices(itensSold);
  return res.status(status.status.ok).json(registerItens);
});

module.exports = { registerSales };
