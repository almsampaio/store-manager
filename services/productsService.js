// conecta service com o model
const productsModel = require('../models/productsModel');

const postProduct = async (name, quantity) => {
  if (name.length < 5) return 'name less than 5';
  
  const searchByName = await productsModel.searchByName(name);
  if (searchByName) return 'Product already exists';

  if (typeof quantity !== 'number') return 'Not a Number';

  if (quantity <= 0) return 'quantity less or equal than 0';

  const product = await productsModel.postProduct(name, quantity);
  return product;
};

const getProductsByID = async (id) => {
  const productByID = await productsModel.getProductsByID(id);

  if (productByID === false || productByID === null) return 'Product not Found';

  return productByID;
};

module.exports = {
  postProduct,
  getProductsByID,
};
