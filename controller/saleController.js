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

  if (!sales) {
  return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
} 

  return res.status(200).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(body);

  const sale = await saleService.update(id, body);

  return res.status(200).json(sale);
};

const exclude = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } }); 
  }

  const sale = await saleService.exclude(id);

  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
