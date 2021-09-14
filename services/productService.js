const productsModel = require('../models/productsModel');

const errorMessage = require('../utils/errorMessage');

const create = async (name, quantity) => {
  if (name.length < 6) {
    return { code: errorMessage.invalidData, message: errorMessage.nameMinimumLength };
  }
  if (quantity <= 0) {
    return { code: errorMessage.invalidData, message: errorMessage.minimumQty };
  }
  if (typeof quantity !== 'number') {
    return { code: errorMessage.invalidData, message: errorMessage.qtyMustBeANumber };
  }

  const nameExists = await productsModel.findByName(name);
    if (nameExists) return { code: errorMessage.invalidData, message: errorMessage.productExists };

  const person = await productsModel.create(name, quantity);

  return person;
};

module.exports = { 
  create,
};
