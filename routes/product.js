const router = require('express').Router();
const controller = require('../controller/products');
const status = require('../status');
const validation = require('../middleware/validations');

const productValidation = [validation.nameValidation, validation.quantityValidation];

router.post('/', productValidation, controller.controllerCreate);
router.get('/', controller.controllerGetAll);
router.get('/:id', controller.controllerGetById);
router.put('/:id', (_req, res) => res.status(status.HTTP_OK_STATUS).json('ok'));
router.delete('/:id', (_req, res) => res.status(status.HTTP_OK_STATUS).json('ok'));

module.exports = router;