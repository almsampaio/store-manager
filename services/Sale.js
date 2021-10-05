const SaleModel = require('../models/Sale');
const ProductModel = require('../models/Product');
const { everyAsync } = require('../helpers/utils');

const isProductIdValid = async (productId) => {
  const product = await ProductModel.getById(productId);

  if (!product) return false;

  return true;
};

const validateProducts = async (itensSold) => {
  const areAllProductsValid = await everyAsync(
    itensSold,
    ({ productId }) => isProductIdValid(productId),
);
  if (!areAllProductsValid) {
    return {
      isValid: false,
      status: 422,
      json: {
        err: {
          code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }

  return {
    isValid: true,
  };
};

/* =========================================================== */

const validateQuantityLength = (quantity) => {
  if (quantity <= 0) {
    return {
      isValid: false,
      status: 422,
      message: '"quantity" must be larger than or equal to 1',
    };
  }

  return {
    isValid: true,
  };
};

const validateQuantityType = (quantity) => {
  if (
    typeof quantity !== 'number'
    || !Number.isInteger(quantity)
  ) {
    return {
      isValid: false,
      status: 422,
      message: '"quantity" must be a number',
    };
  }

  return {
    isValid: true,
  };
};

const isQuantityValid = (quantity) => {
  if (!quantity && quantity !== 0) {
    return {
      isValid: false,
      status: 422,
      message: 'Dados inválidos',
    };
  }

  const validateQuantityTypeObj = validateQuantityType(quantity);
  if (!validateQuantityTypeObj.isValid) return validateQuantityTypeObj;

  const validateQuantityLengthObj = validateQuantityLength(quantity);
  if (!validateQuantityLengthObj.isValid) return validateQuantityLengthObj;

  return {
    isValid: true,
  };
};

const validateQuantities = (itensSold) => {
  const areAllQuantitiesValid = itensSold
    .every(({ quantity }) => isQuantityValid(quantity).isValid);
  if (!areAllQuantitiesValid) {
    return {
      isValid: false,
      status: 422,
      json: {
        err: {
          code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }

  return {
    isValid: true,
  };
};

const isValid = async (itensSold) => {
  const areAllQuantitiesValidObj = validateQuantities(itensSold);
  if (!areAllQuantitiesValidObj.isValid) return areAllQuantitiesValidObj;
  const areAllProductsValidObj = await validateProducts(itensSold);
  if (!areAllProductsValidObj.isValid) return areAllProductsValidObj;

  return {
    isValid: true,
  };
};

const create = async (itensSold) => {
  const isValidObj = await isValid(itensSold);
  if (!isValidObj.isValid) {
    return {
      status: isValidObj.status,
      json: {
        err: {
          message: isValidObj.json.err.message,
          code: 'invalid_data',
        },
      },
    };
  }

  const sale = await SaleModel.create(itensSold);

  return {
    status: 200,
    json: sale,
  };
};

module.exports = {
  create,
  isValid,
};
