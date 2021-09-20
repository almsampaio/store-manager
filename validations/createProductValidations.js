const productServices = require('../services/productsServices');

const invalidErros = {
  code: 'invalid_data',
  shortName: '"name" length must be at least 5 characters long',
  repeatedName: 'Product already exists',
  invalidValue: '"quantity" must be larger than or equal to 1',
  invalidType: '"quantity" must be a number',
};

const unprocessableEntity = 422;

// VALIDAÇÃO DO NOME

// Tamanho mínimo do nome
const shortName = (name, limit) => { 
  if (name === null || !name || name.length < limit) { return true; }
  return false;
};

// Verifica se o nome já existe (se é repetido);
const repeatedName = async (name) => {
  const result = await productServices.getByName(name);
  if (result !== undefined) { return true; }
  if (result === undefined) { return false; }
};

// Middleware para validação do nome
const formatNameValidation = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (shortName(name, 5)) throw new Error(invalidErros.shortName);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

// Middleware para validação do nome
const uniqueNameValidation = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (await repeatedName(name)) throw new Error(invalidErros.repeatedName);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

// VALIDAÇÃO DA QUANTIDADE

const incorrectValue = (quantity) => {
  if (!quantity || quantity === '' || quantity === null || quantity <= 0) {
    return true;
  }
  return false;
};

// Middleware para validação do nome
const quantityValidation = async (req, res, next) => {
  const { quantity } = await req.body;
  console.log(quantity);
  try {
    if (typeof quantity !== 'number') throw new Error(invalidErros.invalidType);
    if (incorrectValue(quantity)) throw new Error(invalidErros.invalidValue);
    // if (!quantity || quantity <= 0) throw new Error(invalidErros.invalidValue);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

module.exports = { formatNameValidation, uniqueNameValidation, quantityValidation };
