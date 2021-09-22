const productsService = require('../services/productsService');

const add = async (req, res, next) => {
  const { name, quantity } = req.body;
  const success = 201;
  const message = 'Product already exists';
  const errCode = 'invalid_data';
  const errType = 422;

  const insertedProduct = await productsService.add(name, quantity);

  if (!insertedProduct) return next({
    err: {
      message,
      code: errCode,
      data: { errType }
    }
  });

  return res.status(success).json(insertedProduct);
};

module.exports = {
  add,
};
