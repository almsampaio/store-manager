const salesServices = require('../services/salesServices');

const create = async (req, res) => {
  const result = await salesServices.create(req.body);
  if (result.err) return res.status(422).json(result);
  res.status(200).json(result);
};

module.exports = {
  create,
};
