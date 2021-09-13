const salesServices = require('../services/salesServices');

const createSale = async (req, res, next) => {
  const sales = req.body;
  const response = await salesServices.createSale(sales);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

module.exports = {
  createSale,
};
