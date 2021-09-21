const SalesService = require('../services/salesServices');
const { SUCCESS_OK, NOT_FOUND } = require('../utils/HttpStatusCodes');

const create = async (req, res) => {
  const sale = req.body;
  const newSale = await SalesService.create(sale);
  return res.status(SUCCESS_OK).json(newSale);   
};

const getAll = (_req, res) => SalesService.getAll()
  .then((sales) => res.status(SUCCESS_OK).json({ sales }));

const getById = (req, res) => {
  const { id } = req.params;
  SalesService.getById(id)
    .then((sale) => res.status(SUCCESS_OK).json(sale))
    .catch(() => res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    }));
};

module.exports = {
  create,
  getAll,
  getById,
};