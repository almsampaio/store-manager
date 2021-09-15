const rescue = require('express-rescue');
const service = require('../services/Sales');
const validadeSale = require('../utils/validateSales');

const create = rescue(async (req, res) => {
  const data = req.body;
  validadeSale(data, res);

  const sales = await service.create(req.body);
  return res.status(200).json(sales);
});

const getAllSales = rescue(async (req, res) => {
  const sales = await service.getAllSales();
  return res.status(200).json(sales);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await service.findById(id);
  if (sale.err) return res.status(404).json(sale);
  return res.status(200).json(sale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const existingSale = await service.findById(id);
  const errorJson = {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  };

  if (existingSale.err) return res.status(422).json(errorJson);
  const deletedSale = await service.deleteSale(id);
  return res.status(200).json(deletedSale);
});

const updateSale = rescue(async (req, res) => {
  const data = req.body;
  validadeSale(data, res);
    const { id } = req.params;
    const newSale = await service.update(id, data);
    return res.status(200).json(newSale);
});

module.exports = {
  create,
  getAllSales,
  findById,
  deleteSale,
  updateSale,
};