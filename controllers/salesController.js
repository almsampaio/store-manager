const {
  StatusCodes: { OK },
} = require('http-status-codes');
const saleService = require('../services/saleService');

// Requisito 5 

exports.postNewSale = async (req, res, next) => {
try {
  const sales = req.body;
  const result = await saleService.createNewSale(sales);
  
  return res.status(OK).json(result);
} catch (e) {
  next(e);
}
};

// Requisito 6 - listando todas as vendas

exports.getAllSales = async (_req, res, next) => {
try {
  const result = await saleService.getAllSales();
  return res.status(OK).json(result);
} catch (e) {
  next(e);
}
};

// Requisito 6 - listando a venda por ID

exports.getById = async (req, res, next) => {
try {
  const { id } = req.params;
  const result = await saleService.getSaleById(id);  
  return res.status(OK).json(result);
} catch (e) {
  next(e);
}
};