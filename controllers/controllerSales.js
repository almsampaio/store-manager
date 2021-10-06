const Service = require('../services/serviceSales');
const { HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpRequests');

const errorStock = 'stock_problem';

const additionalSales = async (req, res) => {
  const sale = await Service.addSales(req.body);

  if (sale.err) {
    return res.status(
      sale.err.code === errorStock ? HTTP_NOT_FOUND_STATUS : HTTP_UNPROCESSABLE_ENTITY,
  ).json(sale); 
}

  res.status(HTTP_OK_STATUS).json(sale);
};

const getSales = async (_req, res) => {
  const sales = await Service.getSales();

  res.status(HTTP_OK_STATUS).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.getSaleById(id);

  if (sale.err) return res.status(HTTP_NOT_FOUND_STATUS).json(sale);

  res.status(HTTP_OK_STATUS).json(sale);
};

const saleUpdated = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.updateSale(id, req.body);

  if (sale.err) {
    return res.status(
      sale.err.code === errorStock ? HTTP_NOT_FOUND_STATUS : HTTP_UNPROCESSABLE_ENTITY,
  ).json(sale);
  }

  res.status(HTTP_OK_STATUS).json(sale);
};

const saleDeleted = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.deleteSale(id);

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