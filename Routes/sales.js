const express = require('express');
const salesController = require('../controllers/sales');
const { validateNewSale } = require('../middlewares/sales');

const router = express.Router();

router.post('/', validateNewSale, salesController.addNew);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.put('/:id', validateNewSale, salesController.updateOne);

router.delete('/:id', salesController.deleteOne);

module.exports = router;
