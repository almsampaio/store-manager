const { created } = require('../../utils/httpStatus');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  res.status(created).json({ name, quantity });
};

module.exports = addProduct;
