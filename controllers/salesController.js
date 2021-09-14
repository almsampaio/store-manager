const rescue = require('express-rescue');

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY = 422;

const salesService = require('../services/salesService');
// const productsService = require('../services/productsService');

const getAll = rescue(async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(HTTP_OK_STATUS).json(sales);
});

const create = rescue(async (req, res) => {
  const itensSold = req.body;
  // const { findProductId } = productsService.getById(productId);
  const { err, sales } = await salesService.create(itensSold);

  // console.log(sales);

  if (err) return res.status(UNPROCESSABLE_ENTITY).json({ err });
  // console.log(sales);
  
  res.status(HTTP_OK_STATUS).json(sales);
});

module.exports = { getAll, create };
