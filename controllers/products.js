const rescue = require('express-rescue');
const productsService = require('../services/products');

const HTTP_OK_STATUS = 200;
const UNPROCESSABLE_ENTITY = 422;
const HTTP_CREATED_STATUS = 201;

const getAll = async (_req, res) => {
  const getAllProducts = await productsService.getAll();
  // if (!getAllProducts) {
  //   return res.status(UNPROCESSABLE_ENTITY).json({
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong id format',
  //     },
  //   });
  // }
  return res.status(HTTP_OK_STATUS).json({ products: getAllProducts });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const findByIdProduct = await productsService.findById(id);
  if (!findByIdProduct) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
    });
  }
  return res.status(HTTP_OK_STATUS).json(findByIdProduct);
};

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const createNewProduct = await productsService.create(name, quantity);
  
  if (createNewProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(createNewProduct);
  }

  res.status(HTTP_CREATED_STATUS).json(createNewProduct);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await productsService.update(id, name, quantity);

  if (updateProduct.err) return res.status(UNPROCESSABLE_ENTITY).json(updateProduct);

  res.status(HTTP_OK_STATUS).json(updateProduct);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
};
