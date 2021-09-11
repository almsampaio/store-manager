const {
  StatusCodes: { OK, CREATED, UNPROCESSABLE_ENTITY },
} = require('http-status-codes');
const productService = require('../services/productService');

// Requisito 1

exports.postNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createNewProduct({ name, quantity });
    if (result) {
      return res.status(CREATED).json(result);
    }
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  } catch (e) {
    next(e);
  }
};

// Requisito 2 - listando todos os produtos

exports.getAllProducts = async (_req, res, next) => {
  try {
    const result = await productService.getAllProducts();
    return res.status(OK).json(result);
  } catch (e) {
    next(e);
  }
};

// Requisito 2 - listando por ID

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    return res.status(OK).json(result);
  } catch (e) {
    next(e);
  }
};

// Requisito 3 - Atualizar um produto

exports.updateOneProduct = async (req, res, next) => {
  try {
    const { params: { id }, body: { name, quantity } } = req;
      await productService.updateProduct({
      id,
      name,
      quantity,
    });
  return res.status(OK).json({
      _id: id,
      name,
      quantity,
    });
  } catch (e) {
    next(e);
  }
};

// Requisito 4 - Deletar um pedido
// https://mongodb.github.io/node-mongodb-native/4.1/classes/Collection.html#findOneAndDelete

exports.deleteOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    res.status(OK).json(result.value);
  } catch (e) {
    next(e);
  }
};
