const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_CREATED,
  HTTP_OK_STATUS,
  HTTP_INTERNAL_SERVER_ERROR,
} = require('../../schemas/status');

const {
  createServices,
  readByAllServices,
  readByIdServices,
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
  const { code, message, data } = await readByAllServices();

  if (!data) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      err: {
        code,
        message,
      },
    });
  }

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

module.exports = { 
  createController,
  readByAllController,
  readByIdController,
};