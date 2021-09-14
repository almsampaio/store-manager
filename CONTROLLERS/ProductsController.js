const {
  insertOneProductIntoSomeDB,
} = require('../SERVICES/ProductsService');

const {
  STATUS_CREATED,
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

module.exports = {
  postOneProduct,
};
