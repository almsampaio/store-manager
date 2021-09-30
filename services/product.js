const {
  findByName,
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
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

  await updateProduct(id, data);
  return { _id: id, ...data };
}

async function updateQntd(id, data) {
  const product = await getProduct(id);
  if (!product) throw new Error('Wrong id format');

  const qnt = product.quantity;

  await updateProduct(id, data);
  return { _id: id, ...data };
}

async function deleteProductService(id) {
  const product = await getProduct(id);
  await deleteProduct(id);

  return {
    id,
    name: product.name,
    quantity: product.quantity,
  };
}

module.exports = { updateQntd, createService, listProductService, updateProductService, deleteProductService };
