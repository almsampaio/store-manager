const service = require('../services');
const { HTTP_UNPROCESSABLE_STATUS, HTTP_OK_STATUS } = require('../helpers');

// REQUISITO 5 ______________________________________________________________________ //

const createSales = async (req, res) => {
  const sale = req.body;

  const products = await service.salesService.createSale(sale);
  if (products.err) {
    return res.status(HTTP_UNPROCESSABLE_STATUS).json(products);
  }
  return res.status(HTTP_OK_STATUS).json(products);
};

// ___________________________________________________________________________________ //

module.exports = {
  createSales,
};
