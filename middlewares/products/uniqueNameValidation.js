const productServices = require('../../services/productsServices');

const invalidErros = {
  code: 'invalid_data',
  shortName: '"name" length must be at least 5 characters long',
  repeatedName: 'Product already exists',
  invalidValue: '"quantity" must be larger than or equal to 1',
  invalidType: '"quantity" must be a number',
};

const unprocessableEntity = 422;

// Verifica se o nome já existe (se é repetido);
const repeatedName = async (name) => {
  const result = await productServices.getByName(name);
  if (result !== undefined) { return true; }
  if (result === undefined) { return false; }
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

module.exports = { uniqueNameValidation };
