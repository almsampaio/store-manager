const express = require('express');
const rescue = require('express-rescue');
const validateId = require('../middlewares/validateId');
const {
  validateSale,
  checkSaleExists,
} = require('../middlewares/validateSale');

const Sales = require('../services/Sales');

const router = express.Router();

router.get('/:id', checkSaleExists, async (req, res) => {
  const { id } = req.params;

  const sale = await Sales.getSaleById(id);

  res.status(200).json(sale);
});

router.put(
  '/:id',
  checkSaleExists,
  validateSale,
  rescue(async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    const sale = await Sales.editSale(id, products);

    res.status(200).json(sale);
  }),
);

router.delete('/:id', validateId, checkSaleExists, async (req, res) => {
  const { id } = req.params;

  const sale = await Sales.deleteSale(id);

  res.status(200).json(sale);
});

router.get('/', async (_req, res) => {
  const sales = await Sales.getAll();

  res.status(200).json({ sales });
});

router.post('/', validateSale, async (req, res) => {
  const itensSold = req.body;

  const sale = await Sales.registerSale(itensSold);
  res.status(200).json(sale);
});

module.exports = router;
