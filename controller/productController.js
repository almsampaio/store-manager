const productService = require('../service/productService');
const constants = require('../constants');

module.exports.createProduct = async (req, res) => {
  let condition;
  const response = { ...constants.defaultServerResponse };
  try {
    condition = true;
    const responseFromService = await productService.createProduct(req.body);
    response.status = 201;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    condition = false;
    response.status = 422;
    response.err.code = constants.productMessage.DATA_INVALID;
    response.err.message = error.message.slice(7);
    delete response.body;
  }
  return res.status(response.status).send(condition ? response.body : response);
};

module.exports.getAllProducts = async (req, res) => {
  let condition;
  const response = { ...constants.defaultServerResponse };
  try {
    condition = true;
    const responseFromService = await productService.getAllProducts();
    response.status = 200;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    condition = false;
    response.status = 422;
    response.err.code = constants.productMessage.DATA_INVALID;
    response.err.message = error.message.slice(7);
    delete response.body;
  }
  return res.status(response.status).send(condition ? response.body : response);
};

module.exports.getProductById = async (req, res) => {
  let condition;
  const response = { ...constants.defaultServerResponse };
  try {
    condition = true;
    const responseFromService = await productService.getProductById(req.params);
    response.status = 200;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    condition = false;
    response.status = 422;
    response.err.code = constants.productMessage.DATA_INVALID;
    response.err.message = error.message.slice(7);
    delete response.body;
  }
  return res.status(response.status).send(condition ? response.body : response);
};

module.exports.updateProduct = async (req, res) => {
  let condition;
  const response = { ...constants.defaultServerResponse };
  try {
    condition = true;
    const responseFromService = await productService.updateProduct(
      { id: req.params.id, updateInfo: req.body },
    );
    response.status = 200;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    condition = false;
    response.status = 422;
    response.err.code = constants.productMessage.DATA_INVALID;
    response.err.message = error.message.slice(7);
    delete response.body;
  }
  return res.status(response.status).send(condition ? response.body : response);
};

module.exports.deleteProduct = async (req, res) => {
  let condition;
  const response = { ...constants.defaultServerResponse };
  try {
    condition = true;
    const responseFromService = await productService.deleteProduct(req.params);
    response.status = 200;
    response.body = responseFromService;
    delete response.err;
  } catch (error) {
    condition = false;
    response.status = 422;
    response.err.code = constants.productMessage.DATA_INVALID;
    response.err.message = error.message.slice(7);
    delete response.body;
  }
  return res.status(response.status).send(condition ? response.body : response);
};
