const services = require('../services/sales');

const controllerGetAll = async (_req, res) => {
  const { status, info } = await services.servicesGetAll();
  res.status(status).json({ sales: info });
};

module.exports = {
  controllerGetAll,
};