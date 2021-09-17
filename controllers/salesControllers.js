const { createSale } = require('../services/saleServices');
const { STATUS_OK, STATUS_UNPROCESSABLE } = require('../utils/httpStatus');

const registerSale = async (req, res) => {
  const items = req.body;
  const itensSold = await createSale(items);
  if (!itensSold) {
    return res.status(STATUS_UNPROCESSABLE).send({});
  }
  return res.status(STATUS_OK).json(itensSold);
};

module.exports = {
  registerSale,
};