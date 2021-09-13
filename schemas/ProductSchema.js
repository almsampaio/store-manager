const ProductsModel = require('../models/ProductsModel');

const errors = {
  name_length: '"name" length must be at least 5 characters long',
  name_already_exists: 'Product already exists',
  quantity_amount: '"quantity" must be larger than or equal to 1',
  typeof_quantity: '"quantity" must be number',
  invalid_product: 'Wrong id format',
};
const status = 422;
const code = 'invalid_data';

const isLengthLetterThan = (value, min) => (value.length < min);
const isGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');

const isExist = async (value) => {
  console.log(value); // o nome chega
  const product = await ProductsModel.findByName(value);
  console.log(product); // está retornando typeOf(FALSE) ou o product que existe

  if (product) return true;
};

const validatePost = (name, quantity) => {
  switch (true) {
    case isLengthLetterThan(name, 5): return { status, code, message: errors.name_length };

    // VERIFICAR SE O NOME JÁ EXISTE! (o nome existe mas não retorna o erro)
    case isExist(name): return { status, code, message: errors.name_already_exists };

    case isGreaterThan(quantity, 1): return { status, code, message: errors.quantity_amount };
    case typeOf(quantity): return { status, code, message: errors.typeof_quantity };
    default: return {};
  }
};

const validateGet = async (id) => {
  const product = await ProductsModel.getById(id);

  // VERIFICAR SE O ID JÁ EXISTE (está retornando {} vazia invés do erro)
  
  if (!product) return { status, code, message: errors.invalid_product };
};

const validatePut = (name, quantity) => {
  switch (true) {
    case isLengthLetterThan(name, 5): return { status, code, message: errors.name_length };
    case isGreaterThan(quantity, 1): return { status, code, message: errors.quantity_amount };
    case typeOf(quantity): return { status, code, message: errors.typeof_quantity };
    default: return {};
  }
};

module.exports = {
  validatePost,
  validateGet,
  validatePut,
};