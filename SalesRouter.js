const express = require('express');
const Sales = require('./controllers/SalesControllers');
// const validateQuantityTypeof = require('./middlewares/validateQuantitySales');

const router = express.Router();

// Requisito 5 - Cria um ou mais vendas;
router.post('/', Sales.createNewSales);
module.exports = router;

// Requisito 6 - Listas as vendas 
router.get('/', Sales.listSales);
// Lista as vendas pelo Id
router.get('/:id', Sales.listASalesById);

// Requisito 7 - Atualizar uma venda
router.put('/:id', Sales.updateSales);
module.exports = router;