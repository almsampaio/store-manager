const {
  HTTP_OK_STATUS,
} = require('../../schemas/status');

const { createServices } = require('../../services/sales/salesServices');

const createController = async (req, res) => {
  const [...products] = req.body;

  const { result } = await createServices(products);

  return res.status(HTTP_OK_STATUS).json(result);
};

module.exports = { createController };