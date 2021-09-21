const salesServices = require('../../services/salesServices');
const productsModels = require('../../models/productsModels');

const updateQuantityInStock = async (id, quantityReturned) => {
  const product = await productsModels.getById(id);
  const { name, quantity } = product;
  const quantityTotalInStock = (quantity + quantityReturned);
  await productsModels.update(id, name, quantityTotalInStock);
};

const updateAllProducts = (productsReturned) => {
  productsReturned.map((product) => updateQuantityInStock(product.productId, product.quantity));
};

// Middleware para remover vendas (sales)
const removeSales = async (req, res, _next) => {
  const { id } = req.params;
  const productsReturned = await salesServices.remove(id);
  updateAllProducts(productsReturned.itensSold);
  return res.status(200).json(productsReturned);
};

module.exports = { removeSales };
