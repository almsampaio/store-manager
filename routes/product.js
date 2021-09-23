const router = require('express').Router();
const controller = require('../controller/products');
const status = require('../status');

router.post('/', controller.controllerCreate);
router.get('/', controller.controllerGetAll);
router.get('/:id', (_req, res) => res.status(status.HTTP_OK_STATUS).json('ok'));
router.put('/:id', (_req, res) => res.status(status.HTTP_OK_STATUS).json('ok'));
router.delete('/:id', (_req, res) => res.status(status.HTTP_OK_STATUS).json('ok'));

module.exports = router;