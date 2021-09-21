const productsServices = require('../../services/productsServices');

const getAllProduts = async (_req, res) => {
  const data = await productsServices.getAll();
  return res.status(200).json({ products: data });
};

module.exports = { getAllProduts };
