const { ObjectId } = require('mongodb');
const saleService = require('../service/saleService');

const create = async (req, res) => {
  const { body } = req;
  const sales = await saleService.create(body);

  return res.status(200).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await saleService.getAll();

  return res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } }); 
  }
  const sales = await saleService.getById(id);

  return res.status(200).json(sales);
};

module.exports = {
  create,
  getAll,
  getById,
};
