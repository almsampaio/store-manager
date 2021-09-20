const productsService = require('../services/productsService');

function errorDefault(err) {
  return {
    status: err.status || 500,
    code: err.code || 'server_error',
    message: err.message,
  };
}

async function create(req, res, next) {
  try {
    const { name, quantity } = req.body;
    const newProductId = await productsService.create(name, quantity);

    res.status(201).json({
      _id: newProductId,
      name,
      quantity,
    });
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

async function getAll(_req, res, next) {
  try {
    const allDocuments = await productsService.getAll();

    res.status(200).json({ products: allDocuments });
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const document = await productsService.getById(id);

    res.status(200).json(document);
  } catch (err) {
    const error = errorDefault(err);

    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
};
