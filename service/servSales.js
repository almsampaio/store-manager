const salesModel = require('../model/modsales');

const errMenorQUm = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const verificaQuantidade = (produtos) => {
  const validateQuant = produtos.find((e) => e.quantity < 1
  || typeof e.quantity === 'string');
  if (validateQuant) return errMenorQUm;
};

const create = async (sale) => {
  const validQuantity = verificaQuantidade(sale);
  if (validQuantity) return validQuantity;
  const saleMod = await salesModel.create(sale);
  // console.log('resposta do create no db em model', saleMod);
  if (saleMod) return saleMod;
};

const errIdNotFind = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const validateExist = (sales) => {
  if (!sales) return errIdNotFind;
};

const getById = async (productId) => {
  const getbyId = await salesModel.getById(productId);
  const validFindId = validateExist(getbyId);
  return validFindId;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
/*   editById,
  deleteById, */
};
