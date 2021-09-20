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

const update = async (req, res) => {
  const { id } = req.params;
  const productSold = req.body;
  console.log(productSold);

  productSold.forEach((sale) => {
    if (sale.quantity <= 0) {
      return res.status(422).json(error);
    }
    if (typeof sale.quantity !== 'number') {
      return res.status(422).json(error);
    }
  });

  await serviceSales.update(id, productSold);
  const newSaleId = await serviceSales.getSalesById(id);
  if (!newSaleId) return res.status(422).json(newSaleId);
  return res.status(200).json(newSaleId);
};

const remove = async (req, res) => {
  const removeSales = await serviceSales.remove(req.params.id);
  if (!removeSales) {
    return res.status(422).json({ err: {
     code: 'invalid_data',
     message: 'Wrong sale ID format' } });
  }
  res.status(200).json(removeSales);
};
module.exports = {
  create,
  getSales,
  getSalesById,
  update,
  remove,
};