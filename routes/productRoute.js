const express = require('express');
// const {validateProduct} = require('../middlewares/productMiddleware');

const router = express.Router();

const {
  createController,
} = require('../controllers/productController');

router.post('/', createController);

module.exports = router;
