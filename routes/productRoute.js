const express = require('express');
// const {validateProduct} = require('../middlewares/productMiddleware');

const router = express.Router();

const {
  createController,
  getAll,
  findById,
  updateById,
} = require('../controllers/productController');

router.post('/', createController);

router.get('/', getAll);

router.get('/:id', findById);

router.put('/:id', updateById);

module.exports = router;
