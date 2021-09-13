const express = require('express');

const router = express.Router();

const { validateProductInput } = require('../middlewares/validateProduct');
const productController = require('../controllers/productController');

router.post('/', [
  validateProductInput,
  productController.create,
]);

router.get('/:id', productController.getByID);

router.get('/', productController.getAll);

router.put('/:id', [
  validateProductInput,
  productController.update,
]);

router.delete('/:id', productController.exclude);

router.use((err, _req, res, _next) => {
  const { details } = err;
  const error = {
    err: {
      code: 'invalid_data',
      message: details[0].message,
    },
  };

  return res.status(422).json(error);
});

module.exports = router;
