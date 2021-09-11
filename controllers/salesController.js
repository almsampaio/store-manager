const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

exports.create = async (req, res) => {
  const sales = req.body;
  try {
    const newSales = await salesService.create({ sales });
    return res.status(StatusCodes.OK).json(newSales);
  } catch (e) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      { err: {
        code: e.name,
        message: e.message,
      } },
    );
  }
};
