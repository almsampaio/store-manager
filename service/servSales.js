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
  console.log('resposta do create no db em model', saleMod);
  if (saleMod) return saleMod;
};

module.exports = {
/*   getAll,
  getById, */
  create,
/*   editById,
  deleteById, */
};
