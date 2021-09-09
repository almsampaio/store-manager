const express = require('express');
// const {validateProduct} = require('../middlewares/productMiddleware');

const router = express.Router();

const {
  createController,
  getAll,
  findById,
} = require('../controllers/saleController');

router.post('/', createController);
router.get('/', getAll);
router.get('/:id', findById);

module.exports = router;
