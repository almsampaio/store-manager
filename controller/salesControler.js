const salesService = require('../services/checkSales');

const addSale = async (req, res) => {
  const itens = req.body;
  const newSale = await salesService.addSales(itens);

  // const { _id } = newSale;
  // const result = { _id, newSale };
  if (!newSale.error) return res.status(200).json(newSale);
  return res.status(newSale.error).json(newSale);
};

const getSales = async (req, res) => {
  const allSales = await salesService.getAll();
  return res.status(200).json({ sales: allSales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (!sale) {
 return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
}
  return res.status(200).json(sale);
};

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
  getSales,
  getSaleById,
  // updateProductById,
  // deleteProductById,
};
