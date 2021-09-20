const serviceSales = require('../services/salesService');

const getSales = async (_req, res) => {
  const sales = await serviceSales.getSales();
  console.log(sales);
  res.status(200).json({ sales });
};

const getSalesById = async (req, res) => {
  const sale = await serviceSales.getSalesById(req.params.id);
  if (!sale) {
    return res.status(404).json({ err: {
      code: 'not_found',
      message: 'Sale not found' } });
  }
  res.status(200).json(sale);
};

const error = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' },
};

const create = async (req, res) => {
  const productSold = req.body;

  productSold.forEach((sale) => {
    if (typeof sale.quantity !== 'number') {
      return res.status(422).json(error);
    }
    if (sale.quantity <= 0) {
      return res.status(422).json(error);
    }
  });
 
  const createSale = await serviceSales.create(productSold);
  if (!createSale) return res.status(422).json(createSale);
  return res.status(200).json(createSale);
};

module.exports = {
  create,
  getSales,
  getSalesById,
};