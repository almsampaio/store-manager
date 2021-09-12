const { Router } = require('express');

const router = new Router();

router.post('/', (_req, res) => {
  res.status(200).json({ Ok: 'oi' });
});

module.exports = router;