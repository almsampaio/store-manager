const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

// router.get('/', null);
// router.get('/:id', null);
router.post('/', productsController.createProduct);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;
