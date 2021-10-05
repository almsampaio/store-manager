const { HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpRequests');
const Service = require('../services');
const { errorStock } = require('../utils/objectError');

const additionalSales = async (req, res) => {
  const sale = await Service.sales.addSales(req.body);

  if (sale.err) {
    return res.status(
      sale.err.code === errorStock ? HTTP_NOT_FOUND_STATUS : HTTP_UNPROCESSABLE_ENTITY,
  ).json(sale); 
}

  res.status(HTTP_OK_STATUS).json(sale);
};

const getSales = async (_req, res) => {
  const sales = await Service.sales.getSales();

  res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.getSaleById(id);

  if (sale.err) return res.status(HTTP_NOT_FOUND_STATUS).json(sale);

  res.status(HTTP_OK_STATUS).json(sale);
};

const saleUpdated = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.updateSale(id, req.body);

  if (sale.err) {
    return res.status(
      sale.err.code === errorStock ? HTTP_NOT_FOUND_STATUS : HTTP_UNPROCESSABLE_ENTITY,
  ).json(sale);
  }

  res.status(HTTP_OK_STATUS).json(sale);
};

const saleDeleted = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.sales.deleteSale(id);

  if (sale.err) {
    return res.status(
      sale.err.code === errorStock ? HTTP_NOT_FOUND_STATUS : HTTP_UNPROCESSABLE_ENTITY,
  ).json(sale);
  }

  res.status(HTTP_OK_STATUS).json(sale);
};

module.exports = {
  additionalSales,
  getSales,
  getSaleById,
  saleUpdated,
  saleDeleted,
};