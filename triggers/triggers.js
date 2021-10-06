const productService = require('../service/productsService');

const updateWhenSaleMaded = async (id, q) => {
  const result = await productService.getById(id);
  const product = result.pop();
  const { _id, name, quantity } = product;
  const operation = await productService.updateProduct(_id, { name, quantity: quantity - q });
  console.log(operation);
  // return operation;
  // const newQ = quantity - q;
  // const operation = await productService.updateProduct(productId, { name, quantity: newQ });
  // return operation;
};

module.exports = {
    updateWhenSaleMaded,
};