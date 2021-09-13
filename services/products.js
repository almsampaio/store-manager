const model = require('../models/products'); // instancia as funçoes de /models/product
const validate = require('../validations/productValidate');

const create = async (name, quantity) => {
  const existingProduct = await model.findByName(name);
  console.log(existingProduct);
  
  // Caso esse autor já exista, retornamos um objeto de erro informando
  // que não é possível criar o autor pois ele já existe
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  const valid = await validate.productValidate(name, quantity);
  if (valid) return valid;
  
  // Caso o autor não exista e, portanto, possa ser criado
    // chamamos o model e retornamos o resultado
    return model.create(name, quantity);
  };

const getAll = async () => model.getAll();

module.exports = {
    create,
    getAll,
};