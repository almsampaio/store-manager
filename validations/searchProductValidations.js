const { ObjectId } = require('mongodb');
// const productServices = require('../services/productsServices');
const productsModels = require('../models/productsModels');

const invalidErros = {
  code: 'invalid_data',
  invalidMongoId: 'Wrong id format',
  idNotExists: 'Wrong id format',
};
const unprocessableEntity = 422;

// Middleware para verificar se o id informado está num formato válido para o mongodb
const idMongodbValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id || id === '') throw new Error(invalidErros.invalidMongoId);
    if (!ObjectId.isValid(id)) throw new Error(invalidErros.invalidMongoId);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

// Middleware para verificar se o id do produto existe
const idExistsValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productExists = await productsModels.getById(id);
    if (!productExists) throw new Error(invalidErros.idNotExists);
  } catch (error) {
    return res.status(unprocessableEntity).json({
      err: { code: invalidErros.code, message: error.message },
    });
  }
  next();
};

module.exports = { idMongodbValidation, idExistsValidation };
