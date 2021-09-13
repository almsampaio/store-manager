const express = require('express');

const router = express.Router();

const saleController = require('../controllers/saleController');
const { validateSaleInput } = require('../middlewares/validateSale');

router.post('/', [
  validateSaleInput,
  saleController.create,
]);

router.get('/:id', saleController.getByID);

router.get('/', saleController.getAll);

router.put('/:id', [
  validateSaleInput,
  saleController.update,
]);

router.use((_err, _req, res, _next) => {
  const error = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };

  return res.status(422).json(error);
});

module.exports = router;
