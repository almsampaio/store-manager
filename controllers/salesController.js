const salesService = require('../services/salesService');

const HTTP_200 = 200;
const HTTP_404 = 404;
const HTTP_422 = 422;

const create = async (req, res) => {
  const itensSold = req.body;
  const { err, sale } = await salesService.create(itensSold);
  if (err) return res.status(HTTP_422).json({ err });
  return res.status(HTTP_200).json(sale);
};

module.exports = {
  // getAll,
  // getById,
  create,
  // editById,
  // deleteById
};
