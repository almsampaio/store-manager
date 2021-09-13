const ProductsModel = require('../models/ProductsModel');

const errors = {
  name_length: '"name" length must be at least 5 characters long',
  name_already_exists: 'Product already exists',
  quantity_amount: '"quantity" must be larger than or equal to 1',
  typeof_quantity: '"quantity" must be number',
  invalid_product: 'Wrong id format',
};

const isLengthLetterThan = (value, min) => (value.length < min);
const isGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');

// >>>>>>>>>>   CORRIGIR MESSAGEM DE ERRO PARA TODOS!!!   <<<<<<<<<

const validatePost = (name, quantity) => {
  const code = 422;
  switch (true) {
    case isLengthLetterThan(name, 5): return { code, message: errors.name_length };

    // VERIFICAR SE O NOME JÁ EXISTE!!

    case isGreaterThan(quantity, 1): return { code, message: errors.quantity_amount };
    case typeOf(quantity): return { code, message: errors.typeof_quantity };
    default: return {};
  }
};

const validateGet = async (id) => {
  const code = 422;
  const product = await ProductsModel.getById(id);

  // VERIFICAR SE O ID JÁ EXISTE
  
  if (!product) return { code, message: errors.invalid_product };
  return {};
};

// PUT OK (exceto msg err)
const validatePut = (name, quantity) => {
  const code = 422;
  switch (true) {
    case isLengthLetterThan(name, 5): return { code, message: errors.name_length };
    case isGreaterThan(quantity, 1): return { code, message: errors.quantity_amount };
    case typeOf(quantity): return { code, message: errors.typeof_quantity };
    default: return {};
  }
};

module.exports = {
  validatePost,
  validateGet,
  validatePut,
};