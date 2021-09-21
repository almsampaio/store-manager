const services = require('../services');

const createSale = async (req, res, _next) => {
  const saleArray = req.body;
  const newSale = await services.sales.createSale(saleArray);

  res.status(200).json(newSale);
};

module.exports = {
  createSale,
};