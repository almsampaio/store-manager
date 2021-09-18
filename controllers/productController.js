const productService = require('../services/productService');

const {
  invalidData,
  // productExists,
  // minimumQty,
  // qtyMustBeANumber,
  wrongIdFormat,
  // nameMinimumLength,
  // problemIdOrQty,
  // notFound,
  // saleNotFound,
  // wrongSaleIdFormat,
  // amountNotpermitted,
  // stockProblem,
} = require('../utils/errorMessage');

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();
  return res.status(200).send({ products: allProducts });
};

const getById = async (req, res) => {
  const { id } = req.params;
  console.log('id - do produto CONTROLLER ------', id);
  const product = await productService.getById(id);
  console.log('getByID ---- controller', product);

  if (!product) {
 return res.status(422)
  .json({ err: { code: 'invalid_data', message: 'Wrong id format' } }); 
}
  return res.status(200).send(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.create(name, quantity);
  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product.productCreated);
};

const actualize = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productService.actualize(name, quantity, id);
  if (product.err) return res.status(product.err.status).json(product);
  return res.status(product.status).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, product } = await productService.remove(id);
  if (!product) {
 return res.status(status)
    .json({ err: { code: invalidData, message: wrongIdFormat } }); 
}
  res.status(status).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  actualize,
  remove,
};