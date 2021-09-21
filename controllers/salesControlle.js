const salesService = require('../services/salesServices');

const insertSale = async (req, res) => {
  const result = await salesService.insertSale(req.body);

  if (result.message) {
    return res.status(result.status).json({ err: { code: 'not_found', message: result.message } });
  }

  res.status(result.status).json(result.data);
};

const findAll = async (_req, res) => {
  const sales = await salesService.findAll();

  res.status(200).json({ sales });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);

  if (sale.err) return res.status(404).json(sale);
  res.status(200).json(sale);
};

module.exports = {
  insertSale,
  findAll,
  findById,
};