const saleService = require('../services/checkSales');

const addSale = async (req, res) => {
  const itens = req.body;
  const newSale = await saleService.addSales(itens);

  // const { _id } = newSale;
  // const result = { _id, newSale };
  if (!newSale.error) return res.status(200).json(newSale);
  return res.status(newSale.error).json(newSale);
};

// const getProducts = async (req, res) => {
//   const allProducts = await ProductService.getAll();
//   return res.status(200).json({ products: allProducts });
// };

// const getProductById = async (req, res) => {
//   const { id } = req.params;
//   const product = await ProductService.getProductById(id);
//   if (!product) {
//  return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
// }
//   return res.status(200).json(product);
// };

// const updateProductById = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const updateProduct = await ProductService.update(id, name, quantity);
//   if (updateProduct.error) {
//     return res.status(422).json(updateProduct);
//   }

//   return res.status(200).json(updateProduct);
// };

// const deleteProductById = async (req, res) => {
//   const { id } = req.params;
//   const deleteProduct = await ProductService.drop(id);
//   if (deleteProduct.error) {
//     return res.status(422).json(deleteProduct);
//   }

//   return res.status(200).json(deleteProduct);
// };

module.exports = {
  addSale,
  // getProducts,
  // getProductById,
  // updateProductById,
  // deleteProductById,
};
