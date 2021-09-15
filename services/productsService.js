const productsModel = require('../models/productsModel');
const
{ validateName,
  validateQuantity,
  validateQuantityType,
  validateProduct } = require('../schemas/ProductSchema');

const getAll = async () => {
  console.log('services');
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  const validationProduct = validateProduct(product);
  if (validationProduct.err) return validationProduct;
  return product;
};

const create = async (name, quantity) => {
  const validationName = validateName(name);
  const validationQuantity = validateQuantity(quantity);
  const validationQuantityType = validateQuantityType(quantity);
  if (validationName.err) return validationName;
  if (validationQuantity.err) return validationQuantity;
  if (validationQuantityType.err) return validationQuantityType;
  const result = await productsModel.findByName(name);
  if (result) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return productsModel.create(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  const validationName = validateName(name);
  const validationQuantity = validateQuantity(quantity);
  const validationQuantityType = validateQuantityType(quantity);
  if (validationName.err) return validationName;
  if (validationQuantity.err) return validationQuantity;
  if (validationQuantityType.err) return validationQuantityType;
  await productsModel.updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  const validationProduct = validateProduct(product);
  if (validationProduct.err) return validationProduct;
  return productsModel.deleteProduct(id);
};

module.exports = { getAll, create, getById, updateProduct, deleteProduct };
