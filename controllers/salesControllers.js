const salesService = require('../services/salesService');

const create = async (req, res) => {
  const productsSold = req.body;
  const { err, statusCode, createdSale } = await salesService.create(productsSold);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json(createdSale);
};

module.exports = {
   create,
};