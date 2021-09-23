const services = require('../services/products');

const controllerCreate = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, info } = await services.servicesCreate(name, quantity);
  res.status(status).json(info);
};

const controllerGetAll = async (_req, res) => {
  const { status, info } = await services.servicesGetAll();
  res.status(status).json({ products: info });
};

module.exports = {
  controllerGetAll,
  controllerCreate,
};