const salesService = require('../services/Sales');

const create = async (req, res) => {
  const itensSold = req.body;

  const sales = await salesService.create(itensSold);

  if (!sales.err) {
    res.status(200).json(sales);
  }

  return res.status(422).json({ err: sales.err });
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.getById(id);

  if (sales.err) return res.status(404).json({ err: sales.err });

  res.status(200).json(sales);
};

const setById = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const sale = await salesService.setById(id, sales);

  if (sale.err) return res.status(422).json({ err: sale.err });

  res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
  setById,
};
