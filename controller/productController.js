const productService = require('../service/productService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { err, product } = await productService.create(name, quantity);
  if (err) {
  return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
    .json({ err }); 
  }
  res.status(HTTP_CREATED_STATUS).json(product);
};

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(HTTP_OK_STATUS).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { err, product } = await productService.getById(id);
  if (err) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { err, product } = await productService.update(id, name, quantity);
  if (err) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .json({ err }); 
  }
  res.status(HTTP_OK_STATUS).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
