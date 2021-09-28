const productService = require('../service/productService');
const constants = require('../constants');

module.exports.createProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.createProduct(req.body);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: createProduct', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
