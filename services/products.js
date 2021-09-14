const { ObjectId } = require('mongodb');
const productModel = require('../models/products');

const validateId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { 
      err1: { err: 
        { code: 'invalid_data', message: 'Wrong id format' } },
      err2: { errCode: 422 } };
  }
  return {};
};

const validateQuantity = (quantity) => {
  if (typeof quantity === 'string') {
    return {
     err1: { err: 
      { code: 'invalid_data', message: '"quantity" must be a number' } },
     err2: { errCode: 422 },
    };
   }
  if (parseInt(quantity, 10) <= 0) {
    return {
      err1: { err: 
        { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } },
      err2: { errCode: 422 },
     };
  }
  return {};
};

const validateName = (name) => {
  const minimumLength = 5;
  if (name.length < minimumLength) {
    return {
      err1: { err: 
        { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } },
      err2: { errCode: 422 },
     };
  }
  return {};
};

const validateNoExistsProduct = async (name) => {
  const OldProduct = await productModel.findByName(name);
  if (OldProduct) {
 return {
    err1: { err: 
      { code: 'invalid_data', message: 'Product already exists' } },
    err2: { errCode: 422 },
   }; 
  }
  return {};
};
 
const create = async (name, quantity) => {
  const validateQtd = validateQuantity(quantity);
  const validateNm = validateName(name);
  const productNotExists = await validateNoExistsProduct(name);
  
  if (validateNm.err1) return validateNm;
  if (validateQtd.err1) return validateQtd;
  if (productNotExists.err1) return productNotExists;

  const newProduct = await productModel.create(name, quantity);
 
  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const getAll = async () => {
 const getAllProducts = await productModel.getAll();
 return getAllProducts;
};

const getById = async (id) => {
  const verifyId = await validateId(id);
  if (verifyId.err1) return verifyId;
 
 const getProductById = await productModel.getById(id);
 return getProductById;
};

const update = async (id, name, quantity) => {
  const validateQtd = validateQuantity(quantity);
  const validateNm = validateName(name);
  const productNotExists = await validateNoExistsProduct(name);
  
  if (validateNm.err1) return validateNm;
  if (validateQtd.err1) return validateQtd;
  if (productNotExists.err1) return productNotExists;
  
  const updateProduct = await productModel.update(id, name, quantity);
  return updateProduct;
};

const remove = async (id) => {
  const verifyId = await validateId(id);
  if (verifyId.err1) return verifyId;
  
  const removedItem = await productModel.remove(id);
  return removedItem;
};

module.exports = { 
  create,
  getAll,
  getById,
  update,
  remove,
};
