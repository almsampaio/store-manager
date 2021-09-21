const invalidErros = {
  code: 'invalid_data',
  shortName: '"name" length must be at least 5 characters long',
  repeatedName: 'Product already exists',
  invalidValue: '"quantity" must be larger than or equal to 1',
  invalidType: '"quantity" must be a number',
};

const unprocessableEntity = 422;

// Tamanho mínimo do nome
const shortName = (name, limit) => { 
  if (name === null || !name || name.length < limit) { return true; }
  return false;
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

module.exports = { formatNameValidation };
