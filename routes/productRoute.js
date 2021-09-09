const express = require('express');
// const {validateProduct} = require('../middlewares/productMiddleware');

const router = express.Router();

const {
  createController,
  getAll,
  findById,
  updateById,
  deleteById,
} = require('../controllers/productController');

router.post('/', createController);
router.get('/', getAll);
router.get('/:id', findById);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;
