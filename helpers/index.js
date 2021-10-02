const { getProductById, updateProduct } = require('../service/productService');

const getNewProduct = (productData) => {
  const { id, name, quantity } = productData;
  const newProductUpdate = {
    id,
    updateInfo: {
      name,
      quantity,
    },
  };
  return updateProduct(newProductUpdate);
};

module.exports.updateProductAfterSalesCreation = async ({ itensSold }) => {
  await itensSold.forEach((product) => (
    getProductById({ id: product.productId })
      .then((sales) => getNewProduct({
        id: product.productId,
        name: sales.name,
        quantity: sales.quantity - product.quantity,
      }))
  ));
};

module.exports.updateProductAfterDeletingSales = async ({ itensSold }) => {
  await itensSold.forEach((product) => (
    getProductById({ id: product.productId })
      .then((sales) => getNewProduct({
        id: product.productId,
        name: sales.name,
        quantity: sales.quantity + product.quantity,
      }))
  ));
};
