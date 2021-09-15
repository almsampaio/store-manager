const rescue = require('express-rescue');
const salesServices = require('../services/sales');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const getAll = async (req, res) => {
  const getAllSales = await salesServices.getAll();

  return res.status(HTTP_OK_STATUS).json({ sales: getAllSales });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findByIdSale = await salesServices.findById(id);
  if (!findByIdSale) {
    return res.status(HTTP_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const create = rescue(async (req, res) => {
  const salesArray = req.body;
  const createSales = await salesServices.create(salesArray);

  if (createSales.err) return res.status(UNPROCESSABLE_ENTITY).json(createSales);

  res.status(HTTP_OK_STATUS).json(createSales);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const salesArray = req.body;

  const updateSale = await salesServices.update(id, salesArray);

  if (updateSale.err) return res.status(UNPROCESSABLE_ENTITY).json(updateSale);

  res.status(HTTP_OK_STATUS).json(updateSale);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
};