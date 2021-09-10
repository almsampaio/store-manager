const productModels = require('../models/productModels');

const errorList = {
  errNameLenght: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  },
  errNotNumber: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
  errQuantity: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  errAlreadyExists: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  errWrongId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const validateName = (name) => {
  if (name.length > 5
    && typeof name === 'string'
  ) return true;
  return false;
};

const isNumber = (param) => {
  if (typeof param !== 'number') return false;
  return true;
};

const validateQuantity = (quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) return false;
  return true;
};

const create = async (name, quantity) => {
  if (!validateName(name)) {
    return errorList.errNameLenght;
  }

  if (!isNumber(quantity)) {
    return errorList.errNotNumber;
  }

  if (!validateQuantity(quantity)) {
    return errorList.errQuantity;
  }

  const result = await productModels.create(name, quantity);

  if (!result) {
    return errorList.errAlreadyExists;
  }

  return result;
};

const getById = async (id) => {
  const result = await productModels.getById(id);
  if (!id || !result) return errorList.errWrongId;
  return result;
};

const updateById = async (id, name, quantity) => {
  if (!validateName(name)) {
    return errorList.errNameLenght;
  }

  if (!isNumber(quantity)) {
    return errorList.errNotNumber;
  }

  if (!validateQuantity(quantity)) {
    return errorList.errQuantity;
  }

  const result = await productModels.updateById(id, name, quantity);
  if (!result) return errorList.errWrongId;
  return result;
};

module.exports = {
  create,
  getById,
  updateById,
};
