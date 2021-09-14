const saleService = require('../services/saleService');

exports.createSale = async (req, res) => {
  const { message, code, sale } = await saleService.create(req.body);

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(200).json(sale);
};
