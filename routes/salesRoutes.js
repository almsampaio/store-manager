const { Router } = require('express');

const router = Router();
const salesControllers = require('../controllers/salesControllers');
// sales
router.get('/sales', salesControllers.getSales);

router.get('/sales/:id', salesControllers.getSalesById);

router.post('/sales', salesControllers.create);

router.put('/sales/:id', salesControllers.update);

router.delete('/sales/:id', salesControllers.remove);

module.exports = router;