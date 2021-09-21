const productsServices = require('../../services/productsServices');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const data = await productsServices.remove(id);
  return res.status(200).json(data);
};

module.exports = { deleteProduct };
