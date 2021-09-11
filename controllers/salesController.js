const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

exports.create = async (req, res) => {
  const sales = req.body;
  try {
    const newSales = await salesService.create({ sales });
    return res.status(StatusCodes.OK).json(newSales);
  } catch (e) {
    const statusCode = e.name === 'stock_problem'
      ? StatusCodes.NOT_FOUND : StatusCodes.UNPROCESSABLE_ENTITY;
    return res.status(statusCode).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(StatusCodes.OK).json({ sales });
  } catch (e) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.get = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await salesService.get({ id });
    return res.status(StatusCodes.OK).json(sales);
  } catch (e) {
    const statusCode = (e.name === 'not_found'
      ? StatusCodes.NOT_FOUND : StatusCodes.UNPROCESSABLE_ENTITY);
    return res.status(statusCode).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const sales = await salesService.update({ id, sales: req.body });
    return res.status(StatusCodes.OK).json(sales);
  } catch (e) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.delete({ id });
    return res.status(StatusCodes.OK).json(sale);
  } catch (e) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};
