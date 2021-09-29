const {
  findByName,
  create,
  getProducts,
  getProduct,
  updateProduct,
} = require('../db/models/product');

async function createService(data) {
  const productExists = await findByName(data.name);
  if (productExists) throw new Error('Product already exists');

  const createProduct = await create(data);
  return createProduct;
}

async function listProductService(id) {
  if (id) {
    const product = await getProduct(id);
    if (!product) throw new Error('Wrong id format');
    return product;
  }
  const products = await getProducts();
  return products;
}

async function updateProductService(id, data) {
  const product = await getProduct(id);
  if (!product) throw new Error('Wrong id format');

  const res = await updateProduct(id, data);
  return res;
}

module.exports = { createService, listProductService, updateProductService };
