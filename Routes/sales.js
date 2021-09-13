const express = require('express');
const salesController = require('../controllers/sales');
// const {  } = require('../middlewares/sales');

const router = express.Router();

router.post('/', salesController.addNew);

module.exports = router;
