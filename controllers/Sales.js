const Sales = require('../services/Products');

const getAll = async (_req, res) => {
  const { status, data } = await Sales.getAll();
  res.status(status).json({ sales: data });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Sales.getById(id);
  res.status(status).json(data);
};

module.exports = {
  getAll,
  getById,
};