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
  const { status, products } = await productService.getAll();

  return res.status(status).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { product, message, status } = await productService.getById(id);
  if (message) return res.status(status).json({ code: invalidData, message: wrongIdFormat });
  res.status(status).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, product, status } = await productService.create(name, quantity);
  // const RESPOSTA = await productService.create(name, quantity);

  // console.log('RESPOSTA ---- productController', RESPOSTA);
  if (code && message) return res.status(status).json({ code, message });

  res.status(status).json(product);
};

// const actualize = async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   const { code, message, product } = await productService.actualize(name, quantity, id);
//   if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
//   res.status(HTTP_OK_STATUS).json(product);
// };

const remove = async (req, res) => {
  const { id } = req.params;
  // const { status, message, product } = await productService.getById(id);
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
  // actualize,
  remove,
};