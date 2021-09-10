const salesService = require('../services/salesService');

const HTTP_200 = 200;
const HTTP_404 = 404;
const HTTP_422 = 422;

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(HTTP_200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return res.status(HTTP_404).json({ err:
      { code: 'not_found', message: 'Sale not found' } });
  }
  return res.status(HTTP_200).json(sale);
};

const create = async (req, res) => {
  const itensSold = req.body;
  const { err, sale } = await salesService.create(itensSold);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(sale);
};

const editById = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { err, sale } = await salesService.editById(id, itensSold);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(sale);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);
  if (!sale) {
    return res.status(HTTP_422).json({ err:
      { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  await salesService.deleteById(id);
  return res.status(HTTP_200).json(sale);
};

module.exports = {
  getAll,
  getById,
  create,
  editById,
  deleteById,
};
