const ProductsModel = require('../models/productModel');

const nameIsValid = async (name) => {
  if (!name || typeof name !== 'string' || name.length < 6) return false;
  if ((await ProductsModel.findOneByName(name)) === undefined) return false;
  return true;
};

const quantityIsValid = (quantity) => {
  if (!quantity || !Number.isInteger(quantity) || quantity <= 0) return false;
  return true;
};

const create = async ({ name, quantity }) => {
  const isNameValid = await nameIsValid(name);
  const isQuantityValid = quantityIsValid(quantity);

  if (!isQuantityValid || !isNameValid) return false;

  const { id } = await ProductsModel
    .create({ name, quantity });
  
  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};
