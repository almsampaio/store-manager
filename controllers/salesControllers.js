const saleService = require('../services/salesService');
const saleModel = require('../model/salesModel');

const createSales = async (req, res) => {
  const productsSold = req.body;
  const { err, statusCode, createdSale } = await saleService.createSale(productsSold);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json(createdSale);
};

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAllSales();
  res.status(200).json({ sales });
};

const getSaleById = async (req, res) => {
  const sale = await saleService.getSaleById(req.params.id);
  if (!sale) {
    return res.status(404).json({
      err: {
      code: 'not_found',
      message: 'Sale not found',
    } });
  }
  res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { err = false, statusCode } = await saleService.updateSales(id, itensSold);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json({ _id: id, itensSold });
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const { err, statusCode, sale } = await saleModel.deleteSales(id);
  await saleService.deleteSales(id);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json(sale);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSales,
};