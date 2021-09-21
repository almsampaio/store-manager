const productsServices = require('../../services/productsServices');

const getProductById = async (req, res) => {
  const { id } = req.params;
  const data = await productsServices.getById(id);
  return res.status(200).json(data);
};

module.exports = { getProductById };
