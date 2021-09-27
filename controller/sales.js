const services = require('../services/sales');

const controllerCreate = async (req, res) => {
  const saleData = req.body;
  const { status, info, message } = await services.servicesCreate(saleData);

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
  res.status(status).json({ itensSold: info });
};

const controllerUpdate = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const { status, info } = await services.servicesUpdate(quantity, id);
  res.status(status).json(info);
};

const controllerDelete = async (req, res) => {
  const { id } = req.params;
  const { status, info, message } = await services.servicesDelete(id);

  if (message) {
    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }
  
  res.status(status).json(info);
};

module.exports = {
  controllerGetAll,
  controllerCreate,
  controllerGetById,
  controllerUpdate,
  controllerDelete,
};