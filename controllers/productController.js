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
      data: { errType },
    },
  });
  
  return res.status(success).json(insertedProduct);
};

const getAll = async (_req, res) => {
  const success = 200;

  const products = await productsService.getAll();

  return res.status(success).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const success = 200;
  const message = 'Wrong id format';
  const code = 'invalid_data';
  const errType = 422;

  const product = await productsService.getById(id);

  if (!product) return next({
    err: {
      message,
      code,
      data: { errType },
    },
  });

  return res.status(success).json(product);
};

module.exports = {
  add,
  getAll,
  getById,
};
