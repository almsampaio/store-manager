const salesService = require('../services/salesService');

const VALID_NAME_STATUS_201 = 201;
const INVALID_NAME_STATUS_422 = 422;

const createSale = async (req, res) => {
  const saleArray = req.body;
  const sale = await salesService.createSale(saleArray);
  if (sale.err) {
    const MESSAGE_ERROR_JSON = { err: sale.err };
    if (sale.status === 422) {
      return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
    }
  }
  return res.status(VALID_NAME_STATUS_201).json(sale);
 };

 module.exports = {
   createSale,
 };
