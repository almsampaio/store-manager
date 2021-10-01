const salesService = require('../service/salesService');
const constants = require('../constants');

module.exports.createSales = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.createSales(req.body);
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 422;
    delete response.body;
  }
  return res.status(response.status).send(response.body);
};

module.exports.getAllSales = async (_req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.getAllSales();
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 422;
    delete response.body;
  }
  return res.status(response.status).send(response.body);
};

module.exports.getSalesById = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.getSalesById(req.params);
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 404;
    response.body = { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return res.status(response.status).send(response.body);
};

module.exports.updateSales = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.updateSales(
      { id: req.params.id, updateInfo: req.body },
    );
    response.status = 200;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    response.status = 422;
    response.body = { err: error.message };
  }
  return res.status(response.status).send(response.body);
};

module.exports.deleteSales = async (req, res) => {
  const response = { ...constants.salesMessage };
  try {
    const responseFromService = await salesService.deleteSales(req.params);
    response.status = 200;
    response.body = responseFromService;
  } catch (error) {
    response.status = 422;
    response.body = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  }
  return res.status(response.status).send(response.body);
};