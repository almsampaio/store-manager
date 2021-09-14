const productsModel = require('../models/productsModel');

const { invalidData, nameMinimumLength, minimumQty,
  qtyMustBeANumber, productExists } = require('../utils/errorMessage');

const getAll = async (_req, _res) => {
    const products = await productsModel.getAll();
    return products;
};

const create = async (name, quantity) => {
  if (name.length < 6) {
    return { code: invalidData, message: nameMinimumLength };
  }
  if (quantity <= 0) {
    return { code: invalidData, message: minimumQty };
  }
  if (typeof quantity !== 'number') {
    return { code: invalidData, message: qtyMustBeANumber };
  }

  const nameExists = await productsModel.findByName(name);
    if (nameExists) return { code: invalidData, message: productExists };

  const person = await productsModel.create(name, quantity);

  return person;
};

module.exports = { 
  create,
  getAll,
};
