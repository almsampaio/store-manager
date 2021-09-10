const productsModel = require('../models/productsModel');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsModel.create(name, quantity);
  res.status(200).json(result);
};

module.exports = {
  create,
};
