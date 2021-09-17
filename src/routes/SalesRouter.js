const { Router } = require('express');

const router = Router();

const SalesController = require('../controllers/SalesController');

const salesValidate = require('../middlewares/salesValidate');

router.post('/', salesValidate, SalesController.create);
router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.findById);
router.put('/:id', salesValidate, SalesController.updateOne);
// router.delete('/:id', SalesController.deleteOne);

module.exports = router;