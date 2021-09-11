const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  if (!name || name.length < 5) return { message: "\"name\" length must be at leat 5 characters long" };
  if (quantity <= 0 ) return { message: "\"quantity\" must be larger than or equal to 1" };
  if (typeof quantity !== 'number') return { message: "\"quantity\" must be a number" };

  const didFindProduct = await productsModel.findByName(name);
  if (didFindProduct) return { message: "Product already exists" };

  const product = await productsModel.create(name, quantity);
  return { product };
}

module.exports = {
  create,
  getAllProducts,
};
