const salesServices = require('../services/salesServices');

const createSale = async (req, res, next) => {
  const sales = req.body;
  const response = await salesServices.createSale(sales);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

const getAllSales = async (req, res) => {
  const sales = await salesServices.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  const response = await salesServices.getSaleById(id);

  if (response.message) return next(response);

  res.status(200).json(response);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const newSale = req.body;

  const response = await salesServices.updateSale(id, newSale);

  res.status(200).json(response);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const response = await salesServices.deleteSale(id);

  if (response.message) return next(response);

  return res.status(200).json(response);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
