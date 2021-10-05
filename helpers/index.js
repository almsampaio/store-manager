const { getProductById, updateProduct } = require('../services/productService');

const updateCreate = async ({ productId: id, quantity: saleQuantity }) => {
  const { quantity: productQuantity } = await getProductById({ id });
  const resultQuantity = productQuantity - saleQuantity;
  // const newProduct = {
  //   id,
  //   updateInfo: {
  //     name,
  //     quantity: resultQuantity,
  //   },
  // };
  // if (newProduct.updateInfo.quantity < 0) {
  //   return null;
  // }
  // await updateProduct(newProduct);
  return resultQuantity;
};

const updateDelete = async ({ productId: id, quantity: saleQuantity }) => {
  const { name, quantity: productQuantity } = await getProductById({ id });
  const resultQuantity = productQuantity + saleQuantity;
  const newProduct = {
    id,
    updateInfo: {
      name,
      quantity: resultQuantity,
    },
  };
  await updateProduct(newProduct);
};

module.exports = {
  updateDelete,
  updateCreate,
};
