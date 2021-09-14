const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productsService');

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productService.create(name, quantity);

    if (result.message) {
      return res.status(result.code)
      .json({
          err: {
            code: 'invalid_data',
            message: result.message,
          },
        });
    }
    return res.status(StatusCodes.CREATED).json(result);
};

async function getAllProducts(_req, res) {
  const products = await productService.getAllProducts();

  return res.status(StatusCodes.OK).json({ products });
}

async function getByID(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getByID(id);

    if (product === null) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        err: { 
         code: 'invalid_data', 
          message: 'Wrong id format', 
        } });
    }

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong id format', 
      } });
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productService.updateProduct(id, name, quantity);
    if (result.message) {
      return res.status(result.code)
      .json({
        err: {
          code: 'invalid_data',
          message: result.message,
        },
      });
    }
      return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong :(');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getByID,
  update,
};
