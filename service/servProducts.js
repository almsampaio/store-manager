const modelProduct = require('../modelo/modProducts');

const errExistencia = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const errMin5 = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const errMenorOuIgual0 = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be at least than or equal to 1',
  },
};

const errTypeString = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const verificaName = async (name) => {
  const verificaSeExiste = await modelProduct.getProductName(name);
  if (typeof name !== 'string' && name.length < 5) {
    return errMin5;
  } if (!verificaSeExiste) {
    return errExistencia;
  }
  return name;
};

 const verificaQuantidade = async (quantity) => {
  if (quantity <= 0) {
    return errMenorOuIgual0;
  } if (typeof quantity === 'string') {
    return errTypeString;
  }
  return quantity;
};

module.exports = {
  verificaName,
  verificaQuantidade,
};
