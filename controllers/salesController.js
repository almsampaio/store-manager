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

const updateSaleByID = async (req, res) => {
  const { body: [{ productId, quantity }], params: { id } } = req;
  const updateSale = await service.updateSaleByID(id, productId, quantity);
  
  if (updateSale.err) return res.status(status.UNPROCESSABLE_ENTITY).json(updateSale);

  return res.status(status.OK).json(updateSale);
};

const deleteSalestByID = async (req, res) => {
  const { params: { id } } = req;
  const deletedSales = await service.deleteSalestByID(id);

  if (deletedSales.err) return res.status(status.UNPROCESSABLE_ENTITY).json(deletedSales);

  return res.status(status.OK).json(deletedSales);
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleByID,
  updateSaleByID,
  deleteSalestByID,
};
