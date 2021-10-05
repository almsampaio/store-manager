const rescue = require('express-rescue');
const service = require('../services/Sale');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = rescue(async (req, res) => {
  const newSale = await service.create(req.body);
  if (newSale.err) return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newSale);

  res.status(OK_STATUS).json(newSale);
});

module.exports = {
  create,
};
