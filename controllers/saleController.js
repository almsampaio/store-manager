const saleService = require('../services/saleService');

const create = async (req, res) => {
  const productsSold = req.body;
  const { err, statusCode, createdSale } = await saleService.create(productsSold);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json(createdSale);
};

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();
  res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const sale = await saleService.getById(req.params.id);
  if (!sale) {
    return res.status(404).json({ err: {
      code: 'not_found',
      message: 'Sale not found' } });
  }
  res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
