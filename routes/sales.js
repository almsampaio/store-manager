const router = require('express').Router();
const controller = require('../controller/sales');
const validation = require('../middleware/validations');

router.post('/', validation.quantityValidation, controller.controllerCreate);
router.get('/', controller.controllerGetAll);
router.get('/:id', controller.controllerGetById);
router.put('/:id', validation.quantityValidation, controller.controllerUpdate);
router.delete('/:id', controller.controllerDelete);

module.exports = router;