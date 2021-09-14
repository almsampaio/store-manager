const Products = require('../models/productsModel');

const getAll = async () => Products.getAll();

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return Products.create(name, quantity);
};

// const findByName = async (name) => {
//   const productByName = await Products.findByName(name);

//   if (!productByName) {
//     return {
//       error: {
//         code: 'invalid_data',
//         message: 'Product not exists',
//       },
//     };
//   }

//   return productByName;
// };

module.exports = {
  getAll,
  create,
};
