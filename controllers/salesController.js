const salesService = require('../services/salesService');

const create = async (req, res) => {
  const { body } = req;

  const { message, sales } = await salesService.create(body);

  if (message) {
 return res.status(422).json({
    err: {
      code: 'invalid_data',
      message,
    },
  }); 
}

  return res.status(200).json(sales);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json({ sales });
};

const find = async (req, res) => {
  const { id } = req.params;

  const { sale, message } = await salesService.find(id);
  if (message) {
 return res.status(404).json({
    err: {
      code: 'not_found',
      message,
    },
  }); 
}
  return res.status(200).json(sale);
};

module.exports = {
  create,
  getAll,
  find,
};
