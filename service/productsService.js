const productsModel = require('../model/productsModel');

const validateName = async (name) => {
  if (!name || name.length < 5) { 
    return {
      err: {
        code: 'invalid_data', 
        message: '"name" length must be at least 5 characters long',
      }, 
    };
  }
  if (await productsModel.existsNameProduct(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  
  return {};
};

const validateQuantity = async (quantity) => {
  if (parseInt(quantity, 10) < 1) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (!quantity || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return {};
};

const createProduct = async (name, quantity) => {
  const validationsName = await validateName(name);
  const validateQuantidade = await validateQuantity(quantity);
  if (validationsName.err) return validationsName;
  if (validateQuantidade.err) return validateQuantidade;
  const product = await productsModel.createProduct(name, quantity);
  const inf = { _id: product.insertedId, name, quantity };
  return { code: 201, inf };
};

const getProducts = async () => {
  const get = await productsModel.getProducts();
  return get;
};

const getPtoductsById = async (_id) => {
  if (!await productsModel.getPtoductsById(_id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  const findId = await productsModel.getPtoductsById(_id);
  return findId;
};

const editProduct = async (_id, name, quantity) => {
  if (!name || name.length < 5) { 
    return {
      err: {
        code: 'invalid_data', 
        message: '"name" length must be at least 5 characters long',
      }, 
    };
}
  const validateQuantidade = await validateQuantity(quantity);
  if (validateQuantidade.err) return validateQuantidade;
  await productsModel.editProduct(_id, name, quantity);
  return (_id, name, quantity);
};

const deleteProduct = async (_id) => {
  if (!await productsModel.getPtoductsById(_id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  const delette = await productsModel.deleteProduct(_id);
  return delette;
};

module.exports = { createProduct, getProducts, getPtoductsById, editProduct, deleteProduct };