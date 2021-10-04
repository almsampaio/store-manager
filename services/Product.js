const ProductModel = require('../models/Product');

const validateNameLength = (name) => {
  if (name.length <= 5) {
    return {
      isValid: false,
      status: 422,
      message: '"name" length must be at least 5 characters long',
    };
  }
  return {
    isValid: true,
  };
};

const validateUniqueName = async (name) => {
  const products = await ProductModel.getAll();
  const hasProductWithSameName = products.find((product) => product.name === name);
  if (hasProductWithSameName) {
    return {
      isValid: false,
      status: 422,
      message: 'Product already exists',
    };
  }
  return {
    isValid: true,
  };
};

const isNameValid = async (name) => {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      status: 422,
      message: 'Dados inválidos',
    };
  }

  const validateNameLengthObj = validateNameLength(name);
  if (!validateNameLengthObj.isValid) return validateNameLengthObj;

  const validateUniqueNameObj = await validateUniqueName(name);
  if (!validateUniqueNameObj.isValid) return validateUniqueNameObj;

  return {
    isValid: true,
  };
};

const isNameValidUpdate = (name) => {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      status: 422,
      message: 'Dados inválidos',
    };
  }

  const validateNameLengthObj = validateNameLength(name);
  if (!validateNameLengthObj.isValid) return validateNameLengthObj;

  return {
    isValid: true,
  };
};

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

const isValid = async (name, quantity) => {
  const isNameValidObj = await isNameValid(name);
  if (!isNameValidObj.isValid) return isNameValidObj;
  const isQuantityValidObj = isQuantityValid(quantity);
  if (!isQuantityValidObj.isValid) return isQuantityValidObj;

  return {
    isValid: true,
  };
};

const isValidUpdate = (name, quantity) => {
  const isNameValidObj = isNameValidUpdate(name);
  if (!isNameValidObj.isValid) return isNameValidObj;
  const isQuantityValidObj = isQuantityValid(quantity);
  if (!isQuantityValidObj.isValid) return isQuantityValidObj;

  return {
    isValid: true,
  };
};

const create = async ({ name, quantity }) => {
  const isValidObj = await isValid(name, quantity);
  if (!isValidObj.isValid) {
    return {
      status: isValidObj.status,
      json: {
        err: {
          message: isValidObj.message,
          code: 'invalid_data',
        },
      },
    };
  }

  const product = await ProductModel.create({ name, quantity });

  return {
    status: 201,
    json: product,
  };
};

const update = async ({ id, name, quantity }) => {
  const isValidObj = isValidUpdate(name, quantity);
  if (!isValidObj.isValid) {
    return {
      status: isValidObj.status,
      json: {
        err: {
          message: isValidObj.message,
          code: 'invalid_data',
        },
      },
    };
  }

  const product = await ProductModel.update({ id, name, quantity });

  return {
    status: 200,
    json: product,
  };
};

module.exports = {
  create,
  isValid,
  update,
};
