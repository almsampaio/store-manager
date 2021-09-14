const SalesServices = require('../services/SalesService');

const OK_STATUS = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const productsList = req.body;

  const newSales = await SalesServices.create(productsList);

  if (newSales.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newSales);
  }

  return res.status(OK_STATUS).json(newSales);
};

const getAll = async (_req, res) => {
  const salesList = await SalesServices.getAll();

  return res.status(OK_STATUS).json({ sales: salesList });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getById(id);

  if (sale.err) {
    return res.status(NOT_FOUND).json(sale);
  }

  return res.status(OK_STATUS).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const productsList = req.body;

  const updatedSale = await SalesServices.update(id, productsList);

  if (updatedSale.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(updatedSale);
  }

  return res.status(OK_STATUS).json(updatedSale);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const removedSale = await SalesServices.remove(id);

  if (removedSale.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(removedSale);
  }

  return res.status(OK_STATUS).json(removedSale);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
