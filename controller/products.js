const services = require('../services/products');

const controllerCreate = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, info, message } = await services.servicesCreate(name, quantity);

  if (message) {
    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }

  res.status(status).json(info);
};

const controllerGetById = async (req, res) => {
  const { id } = req.params;
  const { status, info, message } = await services.servicesGetById(id);

  if (message) {
    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }

  res.status(status).json(info);
};

const controllerGetAll = async (_req, res) => {
  const { status, info } = await services.servicesGetAll();
  res.status(status).json({ products: info });
};

const controllerUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, info } = await services.servicesUpdate(name, quantity, id);
  res.status(status).json(info);
};

module.exports = {
  controllerGetAll,
  controllerCreate,
  controllerGetById,
  controllerUpdate,
};