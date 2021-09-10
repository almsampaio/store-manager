const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await productsService.create(name, quantity);

  res.status(201).json({ message: 'Cadastrado com sucesso!', product });
};

// const getAll = async (_req, res) => {
//   const products = await productsService.getAll();

//   res.status(200).json(products);
// };

module.exports = {
 create,
};