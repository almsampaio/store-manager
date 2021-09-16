const saleService = require('../services/saleService');

exports.getAll = async (_req, res) => {
  const sales = await saleService.getAll();

  res.status(200).json({ sales });
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const { message, code, sale } = await saleService.getById(id);

  if (message) {
    return res.status(404).json({ err: { code, message } });
  }

  res.status(200).json(sale);
};

exports.createSale = async (req, res) => {
  const { message, code, sale } = await saleService.create(req.body);

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(200).json(sale);
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const [toUpdate] = req.body;

  const updatedSale = await saleService.update(id, toUpdate.productId, toUpdate.quantity);

  res.status(200).json(updatedSale);
};
