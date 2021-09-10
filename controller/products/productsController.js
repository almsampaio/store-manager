const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_CREATED,
} = require('../../schemas/status');

const {
  createServices,
} = require('../../services/products/productsServices');

const createController = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, data } = await createServices(name, quantity);

  console.log(data);

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

module.exports = { createController };