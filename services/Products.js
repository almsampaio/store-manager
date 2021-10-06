const productsModel = require('../models/Products');

const code = 'invalid_data';

const nameExists = async (name) => {
  const productsByName = await productsModel.getByName(name);

  if (!productsByName.length) return { result: false };
  return {
    result: true,
    message: 'Product already exists',
  };
};

const nameIsValid = async (name) => {
  const nameLength = name.length;

  if (nameLength >= 5) return { result: true };
  return {
    result: false,
    message: '"name" length must be at least 5 characters long',
  };
};

const quantityIsNumber = async (quantity) => {
  const isNumber = typeof quantity === 'number';

  if (isNumber) return { result: true };
  return {
    result: false,
    message: '"quantity" must be a number',
  };
};

const quantityIsValid = async (quantity) => {
  const isPositive = quantity > 0;

  if (isPositive) return { result: true };
  return {
    result: false,
    message: '"quantity" must be larger than or equal to 1',
  };
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productsById = await productsModel.getById(id);

  if (!productsById) return { code, message: 'Wrong id format' };
  return productsById;
};

const addProduct = async ({ name, quantity }) => {
  const productNameExists = await nameExists(name);
  if (productNameExists.result) return { code, message: productNameExists.message };

  const productNameIsValid = await nameIsValid(name);
  if (!productNameIsValid.result) return { code, message: productNameIsValid.message };

  const productQuantityIsNumber = await quantityIsNumber(quantity);
  if (!productQuantityIsNumber.result) return { code, message: productQuantityIsNumber.message };

  const productQuantityIsValid = await quantityIsValid(quantity);
  if (!productQuantityIsValid.result) return { code, message: productQuantityIsValid.message };

  const addedProduct = await productsModel.addProduct({ name, quantity });
  return addedProduct;
};

const updateProduct = async ({ id, name, quantity }) => {
  const productNameIsValid = await nameIsValid(name);
  if (!productNameIsValid.result) return { code, message: productNameIsValid.message };

  const productQuantityIsNumber = await quantityIsNumber(quantity);
  if (!productQuantityIsNumber.result) return { code, message: productQuantityIsNumber.message };

  const productQuantityIsValid = await quantityIsValid(quantity);
  if (!productQuantityIsValid.result) return { code, message: productQuantityIsValid.message };

  const updatedProduct = await productsModel.updateProduct({ id, name, quantity });
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const productById = await getById(id);

  if (productById.message) return productById;

  const { _id } = await productsModel.deleteProduct(id);

  return {
    _id,
    name: productById.name,
    quantity: productById.quantity,
  };
};

module.exports = {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};
