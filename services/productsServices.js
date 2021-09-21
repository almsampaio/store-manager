const ProductsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const searchedProduct = await ProductsModel.findProductByName(name);
 
  if (searchedProduct) return null;
  
  const newProduct = await ProductsModel
    .create(name, quantity);
  
  return newProduct;
};

const getAll = () => ProductsModel
  .getAll().then((result) => result);

const getById = (id) => ProductsModel
  .getById(id).then((result) => result);

const update = (id, name, quantity) => ProductsModel
  .update(id, name, quantity).then((result) => result);

const exclude = async (id) => {
  const product = await getById(id);
  if (!product) return null;
  await ProductsModel.exclude(id);
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};