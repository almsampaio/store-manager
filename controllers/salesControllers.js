// const services = require('../services/salesServices');
const model = require('../models/salesModel');

const getAll = async (_req, res) => {
  const allSales = await model.getAll();
  return res.status(200).json({ sales: allSales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await model.getById(id);

  if (!sale) {
    return res.status(404).json({ err: 
      { message: 'Sale not found', code: 'invalid_data' },
    });
  }

  return res.status(200).json(sale);
};

module.exports = { getAll, getById };