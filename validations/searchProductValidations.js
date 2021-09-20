const { ObjectId } = require('mongodb');

const invalidErros = {
  code: 'invalid_data',
  invalidMongoId: 'Wrong id format',
};
const unprocessableEntity = 422;

// Middleware para verificar se o id informado está num formato válido para o mongodb
const idMongodbValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) throw new Error(invalidErros.invalidMongoId);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

// VALIDAÇÃO DA QUANTIDADE

module.exports = { idMongodbValidation };
