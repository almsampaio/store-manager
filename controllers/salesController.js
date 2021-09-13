const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const httpStatus = require('../utils/httpStatus');

const getAll = async (req, res) => {
  const allSales = await salesService.getAll();
  console.log(allSales, 'sales controller');
  return res.status(httpStatus.HTTP_OK_STATUS).json({ sales: allSales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (!sale) {
    return res.status(httpStatus.HTTP_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(httpStatus.HTTP_OK_STATUS).json(sale);
};

const create = rescue(async (req, res) => {
  const itensSold = req.body;
  // const { productId, quantity } = [itensSold];
 
  const newSale = await salesService.create(itensSold);
  // if (newSale) {
  //   return res.status(httpStatus.HTTP_OK_STATUS).json(newSale);
  // }
  if (newSale.err) {
    return res.status(httpStatus.HTTP_NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'data not found',
      } });
  }

  return res.status(httpStatus.HTTP_OK_STATUS).json(newSale);
});

const update = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;

  const editSale = await salesService.update(id, itensSold);
  return res.status(httpStatus.HTTP_OK_STATUS).json(editSale);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
