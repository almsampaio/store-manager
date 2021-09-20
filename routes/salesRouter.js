const express = require('express');

const router = express.Router();

const salesController = require('../controllers/Sales');

router.post('/', salesController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/:id', salesController.setById);
router.delete('/:id', salesController.excludeById);

module.exports = router;
