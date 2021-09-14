const rescue = require('express-rescue');
const salesServices = require('../services/sales');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 422;

const create = rescue(async (req, res) => {
  const salesArray = req.body;
  const createSales = await salesServices.create(salesArray);

  if (createSales.err) return res.status(HTTP_NOT_FOUND).json(createSales);

  res.status(HTTP_OK_STATUS).json(createSales);
});

module.exports = {
  create,
};