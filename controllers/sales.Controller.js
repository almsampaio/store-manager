const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const saleArray = req.body;
  const sale = await salesService.createSale(saleArray);
  if (sale.err) {
    const MESSAGE_ERROR_JSON = { err: sale.err };
    if (sale.status === 422) {
      const INVALID_NAME_STATUS_422 = 422;
      return res.status(INVALID_NAME_STATUS_422).json(MESSAGE_ERROR_JSON);
    }
  }
 };

 module.exports = {
   createSale,
 };
