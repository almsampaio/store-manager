const express = require('express');
const bodyParser = require('body-parser');

const Products = require('../controllers/Products');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', Products.createProduct);

module.exports = router;
