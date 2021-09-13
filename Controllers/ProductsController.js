const productRegistration = require('../Services/ProductsService');

async function ProductsControler(request, response) {
  const { name, quantity } = request.body;
  const productToAdd = { name, quantity };
  const registered = await productRegistration(productToAdd);
  return response.status(registered.code).json(registered.response);
}

module.exports = {
  ProductsControler,
};
