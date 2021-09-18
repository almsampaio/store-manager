const { getAllSales, getSalesId } = require('../models/salesModel');

const validateQuantity = async (req, res, next) => {
  const itensSold = req.body;
    for (let i = 0; i < itensSold.length; i += 1) {
  if (itensSold[i].quantity <= 0 || typeof itensSold[i].quantity === 'string') {
    return res.status(422).json(
      { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } },
      );
  }
}
  next();
};

const validSalesId = async (id) => {
  const salesId = await getSalesId({ id });
  if (!salesId) return false;
  return salesId;
};

const getAllSale = async () => {
  const getSales = await getAllSales();
  return getSales;
};

module.exports = {
  validateQuantity,
  getAllSale,
  validSalesId,
};