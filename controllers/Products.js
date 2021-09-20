const ProductsService = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await ProductsService.create(name, quantity);

  if (response.err) {
    return res.status(422).json({ err: response.err });
  }

  res.status(201).json(response);
};

module.exports = {
  create,
};
