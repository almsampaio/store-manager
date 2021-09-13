const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('../../schemas/status');

const { 
  createServices,
  readByAllServices,
  readByIdServices,
  updateServices,
} = require('../../services/sales/salesServices');

const createController = async (req, res) => {
  const [...products] = req.body;

  const { result } = await createServices(products);

  return res.status(HTTP_OK_STATUS).json(result);
};

const readByAllController = async (_req, res) => {
  const { data } = await readByAllServices();

  return res.status(HTTP_OK_STATUS).json({
    sales: data,
  });
};

const readByIdController = async (req, res) => {
  const { id } = req.params;
  const { code, message, data } = await readByIdServices(id);

  if (!data) {
    return res.status(HTTP_NOT_FOUND).json({
      err: {
        code,
        message,
      },
    });
  }

  return res.status(HTTP_OK_STATUS).json(data);
};

const updateController = async (req, res) => {
  const { id } = req.params;
  const [...products] = req.body;

  const { code, message, data } = await updateServices(id, products);

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
  updateController,
};