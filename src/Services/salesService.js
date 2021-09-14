const salesModel = require('../Models/salesModel');
const { salesValidate } = require('../validations/salesValidations');

// const getAllProducts = async () => {
//   const products = await productsModel.getAllProducts();

//   return products;
// };

// const getProductById = async (id) => {
//   const product = await productsModel.getProductById(id);

//   if (!product) {
//     return { err: { code: 'invalid_data', message: 'Wrong id format' } };
//   }
//   return product;
// };

const addSales = async (data) => {
  const validate = salesValidate(data);
  if (validate) {
    return {
        err: {
          code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
        },
      };
  }

  const sales = await salesModel.addSales(data);

  return sales;
};

// const updateProduct = async (id, name, quantity) => {
//   const validate = productsValidate(name, quantity);

//   if (validate) {
//     return validate;
//   }

//   const productToUpdate = await productsModel.updateProduct(id, name, quantity);

//   return productToUpdate;
// };

// const deleteProduct = async (id) => {
//   const productToDelete = await productsModel.deleteProduct(id);

//   if (!productToDelete) {
//     return { err: { code: 'invalid_data', message: 'Wrong id format' } };
//   }
//   return productToDelete;
// };

module.exports = {
  // getAllProducts,
  // getProductById,
  addSales,
  // updateProduct,
  // deleteProduct,
};