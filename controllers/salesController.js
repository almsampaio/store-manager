const service = require('../services/salesService');

const status = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const createNewSales = async (req, res) => {
  const { body: sales } = req;
  const newSales = await service.createNewSales(sales);
  if (newSales.err) return res.status(status.UNPROCESSABLE_ENTITY).json({ err: newSales.err });
  return res.status(status.OK).json(newSales);
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await service.getAllSales();
    return res.status(status.OK).json(sales);
  } catch (err) {
    return res.status(status.SERVER_ERROR).json({ errorMessage: err });
  }
};

const getSaleByID = async (req, res) => {
  const { params: { id } } = req;
  const sale = await service.getSaleByID(id);
  if (sale.err) {
    return res.status(status.NOT_FOUND).json(sale);
  }
  return res.status(status.OK).json(sale);
};

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
  getAllSales,
  getSaleByID,
  // updateProductByID,
  // deleteProductByID,
};
