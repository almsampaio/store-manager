const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// router.get('/', null);
// router.get('/:id', null);
router.post('/', salesController.addSales);
// router.put('/:id', null);
// router.delete('/:id', null);

module.exports = router;
