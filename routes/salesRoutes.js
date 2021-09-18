const { Router } = require('express');

const router = Router();
const salesControllers = require('../controllers/salesControllers');
// sales
router.get('/sales', salesControllers.getSales);

router.post('/sales', salesControllers.create);

module.exports = router;