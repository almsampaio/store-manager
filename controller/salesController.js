const salesService = require('../service/salesService');
const constants = require('../constants');

const createSales = async (req, res) => {
  const { status, message } = await salesService.createSales(req.body);
  return res.status(status).send(message);
};

const getAllSales = async (_req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await salesService.getAllSales();
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    return res.status(response.status).send(error.message);
  }
};

const getSalesById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
    const responseFromService = await salesService.getSalesById(req.params);
    response.status = 200;
    response.body = responseFromService;
    if (!responseFromService) {
      return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    }
    return res.status(response.status).send(response.body);
};

const updateSales = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await salesService.updateSales(
      { id: req.params.id, updateInfo: req.body },
    );
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = constants.ID_INVALID_OR_QUANTITY;
    return res.status(response.status).send(response);
  }
};

const deleteSales = async (req, res) => {
  const { status, message } = await salesService.deleteSales(req.params);
  return res.status(status).send(message);
};

module.exports = {
  createSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};
