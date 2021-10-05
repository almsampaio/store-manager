const saleService = require('../services/Sales');

const {
  HTTP_OK_STATUS,
  HTTP_UNPROCESSED_STATUS, HTTP_NOT_FOUND_STATUS } = require('../httpStatus/httpStatus');

  const getAll = async (req, res) => {
    const sales = await saleService.getAll();
  
    res.status(HTTP_OK_STATUS).json(sales);
  };
  
  const getSaleById = async (req, res) => {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
  
    if (sale.err) {
      return res.status(HTTP_NOT_FOUND_STATUS).json(sale);
    }
  
    return res.status(HTTP_OK_STATUS).json(sale);
  };
  
  const create = async (req, res) => {
    const itensSold = req.body;
    const sales = await saleService.create(itensSold);
    if (sales.err) {
      return res.status(HTTP_UNPROCESSED_STATUS).json(sales);
    }
    return res.status(HTTP_OK_STATUS).json(sales);
  };

module.exports = {
  getAll,
  create,
  getSaleById,
};
