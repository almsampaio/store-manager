const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

async function getAllSales(_req, res) {
  const sales = await salesService.getAllSales();

  if (!sales) {
    return res.status(StatusCodes.NOT_FOUND).json(res);
  }

  return res.status(StatusCodes.OK).json({ sales });
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (sale === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        err: { 
          code: 'not_found', 
          message: 'Sale not found', 
        } });
    }

    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: { 
        code: 'not_found', 
        message: 'Sale not found', 
      } });
  }
}

async function validateQuantitySales(req, res, next) {
  const sales = req.body;

  if (!salesService.isValidQuantity(sales)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity', 
       } });
  }

  next();
}

async function create(req, res) {
  const sales = req.body;

  const newSale = await salesService.create(sales);

  res.status(StatusCodes.OK).json(newSale);
}

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.update(id, req.body);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesService.remove(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

async function validateId(req, res, next) {
  const { id } = req.params;
  const saleId = await salesService.isValidId(id);

  if (!saleId) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong sale ID format' } });
  }

  if (saleId === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      err: { 
        code: 'not_found', 
        message: 'Sale not found', 
      } });
  }

  res.status(StatusCodes.OK).json(saleId);

  next();
}

function updateInventory(req, res, next) {
  const sales = req.body;

  sales.forEach((sale) => {
    if (!salesService.updateInventory(sale)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        err: { 
          code: 'stock_problem', 
          message: 'Such amount is not permitted to sell', 
        } });
      }
      salesService.updateInventory(sale);
    });

  next();
}

async function deleteSales(req, _res) {
  const { id } = req.params;
  await salesService.deleteSales(id);
}

module.exports = {
  getAllSales,
  getById,
  validateQuantitySales,
  create,
  updateSale,
  deleteSale,
  validateId,
  updateInventory,
  deleteSales,
};
