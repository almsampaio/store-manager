const service = require('../services/salesService');

const status = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const createNewSales = async (req, res) => {
  const { body: sales } = req;
  const newSales = await service.createNewSales(sales);
  if (newSales.err) return res.status(status.UNPROCESSABLE_ENTITY).json({ err: newSales.err });
  return res.status(status.OK).json(newSales);
};

// const getAllProducts = async (_req, res) => {
//   try {
//     const products = await service.getAllProducts();
//     return res.status(status.OK).json(products);
//   } catch (err) {
//     return res.status(status.SERVER_ERROR).json({ errorMessage: err });
//   }
// };

// const getProductByID = async (req, res) => {
//   const { params: { id } } = req;
//   const product = await service.getProductByID(id);
//   if (product.err) {
//     return res.status(status.UNPROCESSABLE_ENTITY).json(product);
//   }
//   return res.status(status.OK).json(product);
// };

// const updateProductByID = async (req, res) => {
//   const { body: { name, quantity }, params: { id } } = req;
//   const updatedProduct = await service.updateProductByID(id, name, quantity);
  
//   if (updatedProduct.err) return res.status(status.UNPROCESSABLE_ENTITY).json(updatedProduct);

//   return res.status(status.OK).json(updatedProduct);
// };

// const deleteProductByID = async (req, res) => {
//   const { params: { id } } = req;
//   const deletedProduct = await service.deleteProductByID(id);

//   if (deletedProduct.err) return res.status(status.UNPROCESSABLE_ENTITY).json(deletedProduct);

//   return res.status(status.OK).json(deletedProduct);
// };

module.exports = {
  createNewSales,
  // getAllProducts,
  // getProductByID,
  // updateProductByID,
  // deleteProductByID,
};
