const rescue = require('express-rescue');

const service = require('../services/salesService');

const ERROR_MESSAGES_QUANTITY = { err: { code: 'invalid_data', 
message: 'Wrong product ID or invalid quantity',
} };

const getAll = rescue(async (_req, res) => {
  const salesArray = await service.getAll();

  res.status(200).json({ sales: salesArray });
});

const create = rescue(async (req, res) => {
  const sales = req.body;
  let validateSale = null; 

  sales.forEach((sale) => {
    if (typeof sale.quantity !== 'number' || sale.quantity <= 0) {
      validateSale = ERROR_MESSAGES_QUANTITY;
      return validateSale;
    }
  });

  if (validateSale) return res.status(422).json(validateSale);

  const createSale = await service.create(sales);
  if (createSale.err) return res.status(422).json(createSale);

  res.status(200).json(createSale);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await service.findById(id);

  if (sale.err) return res.status(404).json(sale);

  res.status(200).json(sale);
});

module.exports = {
  getAll,
  create,
  findById,
};
