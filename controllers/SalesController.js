const SalesServices = require('../services/SalesService');

const create = async (req, res) => {
  const productsList = req.body;
  const sale = await SalesServices.create(productsList);

  if (sale.err) return res.status(422).json(sale);

  return res.status(200).json(sale);
};

const getAll = async (_req, res) => {
  const salesList = await SalesServices.getAll();

  return res.status(200).json({ sales: salesList });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getById(id);

  if (sale.err) return res.status(404).json(sale);

  return res.status(200).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const productsList = req.body;
  const sale = await SalesServices.update(id, productsList);

  if (sale.err) return res.status(422).json(sale);

  return res.status(200).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.remove(id);

  if (sale.err) return res.status(422).json(sale);

  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
