const salesService = require('../services/salesService');

const create = async (req, res) => {
  const { body } = req;

  const { message, sales, code, status } = await salesService.create(body);

  if (message) {
 return res.status(status).json({
    err: {
      code,
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

const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const { sale, message } = await salesService.update(id, body);
  if (message) return res.status(422).json({
    err: {
      code: 'invalid_data',
      message
    }
  })

  return res.status(200).json(sale);
}

const remove = async (req, res) => {
  const { id } = req.params;

  const { sale, message } = await salesService.remove(id);
  if (message) return res.status(422).json({
    err: {
      code: 'invalid_data',
      message
    }
  })

  return res.status(200).json(sale);
}

module.exports = {
  create,
  getAll,
  find,
  update,
  remove,
};
