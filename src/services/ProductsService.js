const ProductsModel = require('../models/productsModel');

const create = async ({ name, quantity }) => {
  const alreadyExists = await ProductsModel.findByName(name);

  if (alreadyExists) {
    return { error: { 
      code: 'invalid_data', 
      message: 'Product already exists', 
    },
    };
  }

  const newProduct = await ProductsModel.create({ name, quantity });

  return { newProduct };
};

module.exports = {
  create,
};