const service = require('../services/productsService');

const status = {
  OK: 200,
  CREATED: 201,
  UNPROCESSABLE_ENTITY: 422,
};

const create = async (req, res) => {
  const { body: { name, quantity } } = req;
  const response = await service.create(name, quantity);
  if (response.err) return res.status(status.UNPROCESSABLE_ENTITY).json({ err: response.err });
  return res.status(status.CREATED).json(response);
};

module.exports = {
  create,
};
