const productsService = require('../services/productsService');

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
    const error = {
      status: err.status || 500,
      code: err.code || 'server_error',
      message: err.message,
    };

    next(error);
  }
}

module.exports = {
  create,
};
