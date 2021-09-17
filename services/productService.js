const prodModel = require('../models/productModel');
const { validateName, validateQuantity, validateData } = require('./validates');

const getAll = async () => {
  const data = await prodModel.getAllProduct();
  return data;
};

const getById = async (id) => {
  const data = await prodModel.getProductById(id);
  const validated = await validateData(data, 'invalid_data', 'Wrong id format');
  if (validated.err) return validated;

  return data;
};

const create = async (name, quantity) => {
  const validName = validateName(name);
  if (!validName.isValid) return validName;

  const validQuantity = validateQuantity(quantity);
  if (!validQuantity.isValid) return validQuantity;

  const product = await prodModel.createProduct(name, quantity);
  const validated = await validateData(product, 'invalid_data', 'Product already exists');
  if (validated.err) return validated;

  return { id: product.id, ...product };
};

const update = async (id, name, quantity) => {
  const validName = validateName(name);
  if (!validName.isValid) return validName;

  const validQuantity = validateQuantity(quantity);
  if (!validQuantity.isValid) return validQuantity;

  const newProduct = await prodModel.updateProductById(id, name, quantity);
  if (!newProduct) return false;

  return true;
};

const remove = async (id) => {
  const product = await prodModel.removeProductById(id);

  const validated = await validateData(product, 'invalid_data', 'Wrong id format');
  if (validated.err) return validated;

  return product;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
