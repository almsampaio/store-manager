const saleService = require('../services/saleService');

const create = async (req, res) => {
  const productsSold = req.body;
  const { err, statusCode, createdSale } = await saleService.create(productsSold);
  if (err) return res.status(statusCode).json({ err });
  res.status(200).json(createdSale);
};

module.exports = {
  create,
};
