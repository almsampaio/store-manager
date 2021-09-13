const errorGenerator = require('../utils/errorGenerator');
const errorMsg = require('../utils/errorMessages');
const productsModel = require('../models/productsModel');

const regexName = /^([a-zA-Z\u00C0-\u017F ]{5,})/;

const validateId = () => {
  const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.wrongIdFormat);
  return errorMessage;
};

const validateCreation = async (name, quantity) => {
  if (!regexName.test(name)) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.characterLength);
    return { errorMessage };
  }

  if (await productsModel.getByName(name)) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.productExists);
    return { errorMessage };
  }

  if (typeof quantity !== 'number') {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.quantityType);
    return { errorMessage };
  }

  if (quantity < 1) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.quantity);
    return { errorMessage };
  }
};

const validateUpdate = async (name, quantity) => {
  if (!regexName.test(name)) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.characterLength);
    return { errorMessage };
  }

  if (typeof quantity !== 'number') {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.quantityType);
    return { errorMessage };
  }

  if (quantity < 1) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.quantity);
    return { errorMessage };
  }
};

const validateSale = async (id, quantity) => {
  const product = await productsModel.getById(id);
  
  if (!product || quantity < 1 || (typeof quantity !== 'number')) {
    const errorMessage = errorGenerator(errorMsg.invalidData, errorMsg.invalidIdOrQtd);
    return { errorMessage };
  }
  return null;
};

const validateSaleNotFound = () => {
  const errorMessage = errorGenerator(errorMsg.notFound, errorMsg.saleNotFound);
  return errorMessage;
};

module.exports = {
  validateId,
  validateCreation,
  validateUpdate,
  validateSale,
  validateSaleNotFound,
};
