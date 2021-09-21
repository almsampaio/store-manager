const productsServices = require('../../services/productsServices');

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const data = await productsServices.update(id, name, quantity);
  return res.status(200).json(data);
};

module.exports = { updateProduct };
