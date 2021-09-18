const SaleService = require('../services/SaleService');

const {
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
  HTTP_STATUS_OK,
} = require('../config/httpStatus');

const listAll = async (request, response) => {
  const sales = await SaleService.listAll();
  return response.status(HTTP_STATUS_OK).json({ sales });
};

const findById = async (request, response) => {
  const { id } = request.params;

  try {
    const sale = await SaleService.findById(id);

    if (!sale) {
      return response
        .status(404)
        .json({ err: { code: 'not_found', message: 'Sale not found' } });
    }

    return response.status(HTTP_STATUS_OK).json(sale);
  } catch (error) {
    const err = {
      code: 'invalid_data',
      message: error.message,
    };
    return response.status(404).json({ err });
  }
};

const create = async (request, response) => {
  const sales = request.body;

  try {
    const salesRegistered = await SaleService.register([...sales]);
    return response.status(HTTP_STATUS_OK).json({ ...salesRegistered });
  } catch (error) {
    const err = {
      code: 'invalid_data',
      message: error.message,
    };
    return response.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ err });
  }
};

module.exports = {
  listAll,
  findById,
  create,
};
