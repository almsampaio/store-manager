const express = require('express');
const salesService = require('../services/salesService');
const salesMiddlewares = require('../middlewares/middlewareSales');
const SalesRouter = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

SalesRouter.get('/', async (_req, res) => {
  const allSales = await salesService.listAll();
  return res.status(HTTP_OK_STATUS).json({ sales: allSales });
});

SalesRouter.get('/:id',
  salesMiddlewares.validaIdParams,
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.listSaleId(id);
    if(sale == null) return res.status(HTTP_NOT_FOUND).json({ err: { 
      code: 'not_found',
      message: 'Sale not found',
    } });
    return res.status(HTTP_OK_STATUS).json(sale);
  });

SalesRouter.put('/:id',
  salesMiddlewares.validaId,
  salesMiddlewares.validaQuantidade,
  async (req, res) => {
    const { id } = req.params;
    const [...products] = req.body;
    const product = await salesService.editSale(id, products);
    return res.status(HTTP_OK_STATUS).json(product);
  });

SalesRouter.delete('/:id',
  salesMiddlewares.validaIdSale,
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.deleteSale(id);
    return res.status(HTTP_OK_STATUS).json(sale);
  }
);

SalesRouter.post('/',
  salesMiddlewares.validaId,
  salesMiddlewares.validaQuantidade,
  async (req, res) => {
    const salesArray = req.body;
    const sales = await salesService.registerSales(salesArray);
    return res.status(HTTP_OK_STATUS).json(sales);
  }
);

module.exports = SalesRouter;