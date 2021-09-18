const SaleService = require('../services/SaleService');

const {
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
  HTTP_STATUS_OK,
} = require('../config/httpStatus');

const create = async (request, response) => {
  const sales = request.body;

  try {
    const salesRegistered = await SaleService.register([...sales]);
    console.log(salesRegistered);
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
  create,
};
