const services = require('../services/sales');

const controllerCreate = async (req, res) => {
  const itensSold = req.body;
  const { status, info, message } = await services.servicesCreate(itensSold);

  if (message) {
    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }

  res.status(status).json(info);
};

const controllerGetById = async (req, res) => {
  const { id } = req.params;
  const { status, info, message } = await services.servicesGetById(id);

  if (message) {
    return res.status(status).json({ err: { code: 'not_found', message } });
  }

  res.status(status).json({ sales: info });
};

const controllerGetAll = async (_req, res) => {
  const { status, info } = await services.servicesGetAll();
  res.status(status).json({ sales: info });
};

const controllerUpdate = async (req, res) => {
  const { id } = req.params;
  const saleData = req.body;
  const { status, info } = await services.servicesUpdate(saleData, id);
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