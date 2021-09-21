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

  if (code && code === 'stock_problem') {
    return res.status(404).json({ err: { code, message } });
  }

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(200).json(sale);
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const [toUpdate] = req.body;

  const {
    message,
    code,
    sale,
  } = await saleService.update(id, toUpdate.productId, toUpdate.quantity);

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(200).json(sale);
};

exports.deleteSale = async (req, res) => {
  const { id } = req.params;

  const { message, code } = await saleService.delete(id);

  if (message) {
    return res.status(422).json({ err: { code, message } });
  }

  res.status(200).end();
};
