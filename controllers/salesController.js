const salesService = require('../services/salesServices');
const STATUS = require('../util/myConst');

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSales = await salesService.create(body);
    return res.status(STATUS.STATUS_200_OK).json(createdSales)
  } catch (e) {
    next(e);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(STATUS.STATUS_200_OK).json({ sales });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    return res.status(STATUS.STATUS_200_OK).json(...sale);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  create,
  getAll,
  getById,
};
