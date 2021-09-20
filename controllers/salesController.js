const salesService = require('../services/salesService');

const create = async (req, res) => {
  const sales = req.body;
  const sale = await salesService.create(sales);
  console.log('sale', sale);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const sale = await salesService.getById(_id);
  if (sale.err) {
    return res.status(404).json(sale);
  }
  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
