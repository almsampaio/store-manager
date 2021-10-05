const productService = require('../services/productService');
const constants = require('../constants');

module.exports.createProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.createProduct(req.body);
    response.status = 201;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = error.message;
    return res.status(response.status).send(response);
  }
};

module.exports.getAllProducts = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getAllProducts();
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    return res.status(response.status).send(error.message);
  }
};

module.exports.getProductById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.getProductById(req.params);
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = error.message;
    return res.status(response.status).send(response);
  }
};

module.exports.updateProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.updateProduct(
      { id: req.params.id, updateInfo: req.body },
    );
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = error.message;
    return res.status(response.status).send(response);
  }
};

module.exports.deleteProduct = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await productService.deleteProduct(req.params);
    response.status = 200;
    response.body = responseFromService;
    return res.status(response.status).send(response.body);
  } catch (error) {
    response.status = 422;
    response.err.code = constants.DATA_INVALID;
    response.err.message = error.message;
    return res.status(response.status).send(response);
  }
};
