const router = require('express').Router();
const productsController = require('../../controllers/productsController');

router.post('/', productsController.create);

module.exports = router;
