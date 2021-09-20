const express = require('express');
const Sales = require('./controllers/SalesControllers');
// const validateQuantityTypeof = require('./middlewares/validateQuantitySales');

const router = express.Router();

router.post('/', Sales.createNewSales);
module.exports = router;