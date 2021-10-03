const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.products.addProduct);

module.exports = {
  router,
};