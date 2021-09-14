const {
  insertOneProductIntoSomeDB,
  findAllProductsInSomeDB,
  findOneProductInSomeDBByID,
} = require('../SERVICES/ProductsService');

const {
  STATUS_CREATED,
  STATUS_OK,
} = require('../CONSTANTS/httpStatusCode');

async function postOneProduct(req, res) {
  const { name, quantity } = req.body;
  const productToInsert = { name, quantity };
  const responseFromInsert = await insertOneProductIntoSomeDB(productToInsert);
  if (responseFromInsert.err) {
    return res.status(responseFromInsert.statusCode).json({ err: responseFromInsert.err });
  }
  return res.status(STATUS_CREATED).json(responseFromInsert);
}

async function getAllProducts(_req, res) {
  const allProducts = await findAllProductsInSomeDB();
  if (allProducts.err) return res.status(allProducts.statusCode).json({ err: allProducts.err });
  return res.status(STATUS_OK).json(allProducts);
}

async function getOneProductByID(req, res) {
  const { id } = req.params;
  const product = await findOneProductInSomeDBByID(id);
  if (product.err) return res.status(product.statusCode).json({ err: product.err });
  return res.status(STATUS_OK).json(product);
}

module.exports = {
  postOneProduct,
  getAllProducts,
  getOneProductByID,
};
