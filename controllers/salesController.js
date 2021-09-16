const salesService = require('../services/salesService');

const create = async (req, res) => {
  const sales = await salesService.create(req.body);
  res.status(200).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
