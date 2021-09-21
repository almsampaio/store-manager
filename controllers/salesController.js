const SalesService = require('../services/salesServices');
const { SUCCESS_OK, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../utils/HttpStatusCodes');

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

const update = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;
    await SalesService.update(id, itensSold);
    return res.status(SUCCESS_OK).json({ _id: id, itensSold });       
  } catch (error) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const product = await SalesService.exclude(id);
  if (!product) {
    res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    }); 
  }

  return res.status(SUCCESS_OK).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};