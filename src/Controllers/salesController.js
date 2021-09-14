const salesService = require('../Services/salesService');

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_UNPROCESSABLE = 422;
const HTTP_STATUS_NOT_FOUND = 404;

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(HTTP_STATUS_OK).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.getSaleById(id);
  if (sale.err) {
    return res.status(HTTP_STATUS_NOT_FOUND).json(sale);
  }
  return res.status(HTTP_STATUS_OK).json(sale);
};

const addSales = async (req, res) => {
  const sales = await salesService.addSales(req.body);
  if (sales.err) {
    return res.status(HTTP_STATUS_UNPROCESSABLE).json(sales);
  }

  return res.status(HTTP_STATUS_OK).json(sales);
};

// const updateProduct = async (req, res) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;

//   const productToUpdate = await productsService.updateProduct(id, name, quantity);
//   if (productToUpdate.err) {
//     return res.status(HTTP_STATUS_UNPROCESSABLE).json(productToUpdate);
//   }
//   return res.status(HTTP_STATUS_OK).json(productToUpdate);
// };

// const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   const productToDelete = await productsService.deleteProduct(id);
//   if (productToDelete.err) {
//     return res.status(HTTP_STATUS_UNPROCESSABLE).json(productToDelete);
//   }
//   return res.status(HTTP_STATUS_OK).json(productToDelete);
// };

module.exports = {
  getAllSales,
  getSaleById,
  addSales,
  // updateProduct,
  // deleteProduct,
};