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
