const { StatusCodes } = require('http-status-codes');
const service = require('../services/salesService');
const {
  codes: { stockProblem }, messages: { amountNotPermited },
} = require('../messages/messages');

const create = async (req, res) => {
  const sale = req.body;

  const newSale = await service.create(sale);

  if (!newSale) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: { code: stockProblem, message: amountNotPermited },
    });
  }

  if (newSale.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(newSale);

  return res.status(StatusCodes.OK).json(newSale);
};

const findAll = async (_req, res) => {
  const sales = await service.findAll();

  // console.log(sales);

  return res.status(StatusCodes.OK).send(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await service.findById(id);

  if (sale.err) return res.status(StatusCodes.NOT_FOUND).json(sale);

  return res.status(StatusCodes.OK).json(sale);
};

const updateOne = async (req, res) => {
  const { productId, quantity } = req.body[0];

  const sale = await service.updateOne(productId, quantity);

  if (sale.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(sale);

  return res.status(StatusCodes.OK).json(sale);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const sale = await service.deleteOne(id);

  if (sale.err) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(sale);

  return res.status(StatusCodes.OK).json(sale);
};

module.exports = {
  create,
  findAll,
  findById,
  updateOne,
  deleteOne,
};
