const productsServices = require('../services/productsServices');
require('dotenv').config();

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  console.log(products);
  return res.status(process.env.STATUS_200_OK).json({ products });
}

module.exports = {
  getAll,
}
