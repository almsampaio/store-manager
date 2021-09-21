const Products = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, data, message } = await Products.create(name, quantity);

  if (message) {
    return res.status(status).json({
      err: { code: 'invalid_data', message },
    });
  }

  res.status(status).json(data);
};

module.exports = {
  create,
};
