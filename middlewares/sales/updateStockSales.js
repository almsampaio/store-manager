const productsModels = require('../../models/productsModels');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

const updateQuantityInStock = async (id, newQuantity, method) => {
  const product = await productsModels.getById(id);
  const { name, quantity } = product;
  let quantityTotalInStock = 0;
  if (method === 'POST') { quantityTotalInStock = quantity - newQuantity; }
  // const quantityTotalInStock = (quantity - newQuantity);
  await productsModels.update(id, name, quantityTotalInStock);
};

const updateAllProducts = (productsSold, method) => {
  productsSold.map((product) => updateQuantityInStock(product.productId, product.quantity, method));
};

// Middleware para verificar se a quantidade do produto existe
const updateStockSales = async (req, res, next) => {
  const productsSold = req.body;
  const { method } = req;
  try {
    updateAllProducts(productsSold, method);
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};

module.exports = { updateStockSales };

// echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 3 }, {"productId": "61495cc33ebb7f8665eafa30", "quantity": 1 }]' | http POST :3000/sales
// echo '[{"productId": "61495cc33ebb7f8665eafa30", "quantity": 3 }]' | http POST :3000/sales