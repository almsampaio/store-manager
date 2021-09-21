const SalesServices = require('../services/Sales');
const status = require('../utils/httpStatus');

exports.create = async (req, res) => {
  const sales = req.body;

  const createdSales = await SalesServices.create(sales);

  res.status(status.ok).json(createdSales);
};

exports.getAll = async (_req, res) => {
  const sales = await SalesServices.getAll();

  res.status(status.ok).json({ sales });
};

exports.getById = async (req, res) => {
  const { sale } = await req;

  res.status(status.ok).json(sale);
};
