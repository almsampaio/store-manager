const router = require('express').Router();
const salesController = require('../../controllers/salesController');

// GET
// router.get('/', salesController.getAll);
// router.get('/:id', salesController.getById);

// POST
router.post('/', salesController.create);

// PUT
// router.put('/:id', salesController.update);

// DELETE
// router.delete('/:id', salesController.deleteDocument);

module.exports = router;
