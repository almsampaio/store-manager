const salesServices = require('../service/sales');

const create = async (req, res) => {
  const result = await salesServices.createSales(req.body);
  res.status(result.statusCode).json(result.json);
};

const getAll = async (req, res) => {
  const result = await salesServices.getAllSales();
  res.status(result.statusCode).json(result.json);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.findByIdSales(id);
  res.status(result.statusCode).json(result.json);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.updateSales(id, req.body);
  res.status(result.statusCode).json(result.json);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const result = await salesServices.deleteSales(id);
  res.status(result.statusCode).json(result.json);
};

module.exports = {
  create,
  getAll,
  findById,
  updateSales,
  deleteSales,
};