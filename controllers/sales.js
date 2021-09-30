const serviceSales = require('../services/sales');
const status = require('../services/status');

const getAll = async (req, res) => {
  const allSales = await serviceSales.getAll();
  return res.status(status.HTTP_OK_STATUS).json({ sales: allSales });
};

const inputSales = async (req, res) => {
  const salesArray = req.body;
  const newSale = await serviceSales.inputSales(salesArray);
  if (newSale.err) return res.status(status.UNPROCESSABLE_ENTITY).json(newSale);
  return res.status(status.HTTP_OK_STATUS).json(newSale);
};

const searchSale = async (req, res) => {
  const { id } = req.params;
  const sale = await serviceSales.searchSale(id);
  if (!sale) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  return res.status(status.HTTP_OK_STATUS).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const updateSaleId = await serviceSales.updateSale(id, itensSold);
  if (updateSaleId.err) return res.status(422).json(updateSaleId);
  return res.status(status.HTTP_OK_STATUS).json(updateSaleId);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const delSale = await serviceSales.deleteSale(id);
  console.log(delSale);
  if (delSale.err) return res.status(status.UNPROCESSABLE_ENTITY).json(delSale);
  return res.status(status.HTTP_OK_STATUS).json(delSale);
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
  deleteSale,
};
