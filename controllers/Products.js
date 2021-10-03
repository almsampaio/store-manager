const service = require('../services/Products');

const OK = 200;
const CREATED = 201;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(CREATED).json(newProduct);
};

const readAll = async (_req, res, _next) => {
  const all = await service.readAll();

  res.status(OK).json({ products: all });
};

const readById = async (req, res, next) => {
  const { id } = req.params;
  const product = await service.readById(id);

  if (product.error) return next(product);

  res.status(OK).json(product);
};

const update = async(req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updateProduct = await service.update(id, name, quantity);

  if (updateProduct.error) return next(updateProduct);

  res.status(OK).json(updateProduct);
};

const destroy = async(req, res, next) => {
  const { id } = req.params;
  const productDeleted = await service.destroy(id);

  if (productDeleted.error) return next(productDeleted);

  res.status(OK).json(productDeleted);
};

module.exports = {
  create,
  readAll,
  readById,
  update,
  destroy,
}; 