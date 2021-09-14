const Product = require('../models/Product');

const getAllProducts = async () => Product.getAllProducts();

const create = async (name, quantity) => {
  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    const errorMsg = {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
    return errorMsg;
  }

  return Product.create(name, quantity);
};

const update = async (name, quantity, id) => {
  const newProduct = await Product.update(name, quantity, id);

  return newProduct;
};

const findById = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const product = await Product.findById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return product;
};

module.exports = {
  create,
  getAllProducts,
  findById,
  update,
};