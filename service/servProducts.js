const modelProduct = require('../model/modProducts');

const errExistencia = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const errMin5 = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const errMenorOuIgual0 = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const errTypeString = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const verificaName = async (name) => {
  const verificaSeExiste = await modelProduct.getProductName(name);
  if (typeof name !== 'string' || name.length < 5) {
    throw errMin5;
  } if (verificaSeExiste) {
    throw errExistencia;
  }
  return name;
};

 const verificaQuantidade = async (quantity) => {
  if (typeof quantity === 'string') {
  throw errTypeString;
} if (quantity <= 0) {
  throw errMenorOuIgual0;
}
  return quantity;
};

const validaCreateProducts = async (name, quantity) => {
  try {
    const validaName = await verificaName(name);
    const validaQuantity = await verificaQuantidade(quantity);
    if (validaName === name && validaQuantity === quantity) {
      const createdProduct = await modelProduct.insertProducts(validaName, validaQuantity);
      throw createdProduct;
    }
  } catch (err) {
    return err;
  }
};

const getAllProducts = async () => {
  try {
    const AllProducts = await modelProduct.getAll()
      .then((e) => ({
        products: e,
      }));
      throw AllProducts;
  } catch (err) {
    return err;
  }
};

module.exports = {
  verificaName,
  verificaQuantidade,
  getAllProducts,
  validaCreateProducts,
};
