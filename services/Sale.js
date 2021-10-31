const SaleModel = require('../models/Sale');
const ProductModel = require('../models/Product');
const { everyAsync } = require('../helpers/utils');

const isProductIdValid = async (productId) => {
  const product = await ProductModel.getById(productId);

  if (!product) return false;

  return true;
};

const isProductQuantityValid = async (productId, quantity) => {
  const product = await ProductModel.getById(productId);

  if (product.quantity >= quantity) return true;

  return false;
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
      message: 'Wrong product ID or invalid quantity',
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

const validateQuantityValues = (itensSold) => {
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

const validateProductQuantities = async (itensSold) => {
  const areAllProductsValid = await everyAsync(
    itensSold,
    ({ productId, quantity }) => isProductQuantityValid(productId, quantity),
  );
  if (!areAllProductsValid) {
    return {
      isValid: false,
      status: 404,
      json: {
        err: {
          code: 'stock_problem', message: 'Such amount is not permitted to sell',
        },
      },
    };
  }

  return {
    isValid: true,
  };
};

const validateQuantities = async (itensSold) => {
  const validateQuantityValuesObj = validateQuantityValues(itensSold);
  if (!validateQuantityValuesObj.isValid) return validateQuantityValuesObj;
  const validateProductQuantitiesObj = await validateProductQuantities(itensSold);
  if (!validateProductQuantitiesObj.isValid) return validateProductQuantitiesObj;

  return {
    isValid: true,
  };
};

const isValid = async (itensSold) => {
  if (!itensSold || !itensSold.length) {
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

  const areAllQuantitiesValidObj = await validateQuantities(itensSold);
  if (!areAllQuantitiesValidObj.isValid) return areAllQuantitiesValidObj;
  const areAllProductsValidObj = await validateProducts(itensSold);
  if (!areAllProductsValidObj.isValid) return areAllProductsValidObj;

  return {
    isValid: true,
  };
};

const updateProducts = async (itensSold, sum) => {
  const promises = itensSold.map(async (item) => {
    const { _id, name, quantity } = await ProductModel.getById(item.productId);
    await ProductModel.update({
      id: _id,
      name,
      quantity: sum ? quantity + item.quantity : quantity - item.quantity,
    });
  });
  await Promise.all(promises);
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
  await updateProducts(itensSold, false);

  return {
    status: 200,
    json: sale,
  };
};

const update = async ({ id, itensSold }) => {
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

  const sale = await SaleModel.update({ id, itensSold });

  return {
    status: 200,
    json: sale,
  };
};

module.exports = {
  create,
  isValid,
  update,
  updateProducts,
};
