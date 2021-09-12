const {
  StatusCodes: { OK },
} = require('http-status-codes');
const saleService = require('../services/saleService');

// Requisito 5 

exports.postNewSale = async (req, res, next) => {
try {
  const sales = req.body;
  const result = await saleService.createNewSale(sales);
  
  return res.status(OK).json(result);
} catch (e) {
  next(e);
}
};