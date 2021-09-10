const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_CREATED,
  HTTP_OK_STATUS,
} = require('../../schemas/status');

const {
  createServices,
  readByAllServices,
  readByIdServices,
  updateServices,
  deleteServices,
} = require('../../services/products/productsServices');

const createController = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, data } = await createServices(name, quantity);

  if (!data) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code,
        message,
      },
    });
  }

  return res.status(HTTP_CREATED).json(data);
};

const readByAllController = async (_req, res) => {
  const { data } = await readByAllServices();

  return res.status(HTTP_OK_STATUS).json({
    products: data,
  });
};

const readByIdController = async (req, res) => {
  const { id } = req.params;
  const { code, message, data } = await readByIdServices(id);

  if (!data) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code,
        message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(data);
};

const updateControler = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { code, message, data } = await updateServices(id, name, quantity);

  if (!data) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code,
        message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(data);
};

const deleteController = async (req, res) => {
  const { id } = req.params;
  const { code, message, deletedData } = await deleteServices(id);

  if (!deletedData) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: {
        code,
        message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(deletedData);
};

module.exports = { 
  createController,
  readByAllController,
  readByIdController,
  updateControler,
  deleteController,
};