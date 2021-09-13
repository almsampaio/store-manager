const salesServices = require('../services/salesServices');
const httpStatus = require('../utils/httpStatus');

const createSale = async (req, res) => {
  const sales = req.body;

  const { prodSale, errorMessage } = await salesServices.createSale(sales);

  if (errorMessage) {
    return res.status(httpStatus.invalidData).json(errorMessage);
  }

  return res.status(httpStatus.ok).json(prodSale);
};

module.exports = {
  createSale,
};
