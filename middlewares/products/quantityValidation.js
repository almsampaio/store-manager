const invalidErros = {
  code: 'invalid_data',
  shortName: '"name" length must be at least 5 characters long',
  repeatedName: 'Product already exists',
  invalidValue: '"quantity" must be larger than or equal to 1',
  invalidType: '"quantity" must be a number',
};

const unprocessableEntity = 422;

const incorrectValue = (quantity) => {
  if (!quantity || quantity === '' || quantity === null || quantity <= 0) {
    return true;
  }
  return false;
};

// Middleware para validação do nome
const quantityValidation = async (req, res, next) => {
  const { quantity } = await req.body;
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

module.exports = { quantityValidation };
