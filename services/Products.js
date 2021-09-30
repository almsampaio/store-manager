const Products = require('../models/Products');

// const { serializeProduct } = require('../middlewares/serializers');

async function createProduct({ name, quantity }) {
  const product = await Products.createProduct({ name, quantity });

  // return serializeProduct(product);
  return product;
}

module.exports = {
  createProduct,
};
