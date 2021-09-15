const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  quantityLength: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
  idInvalid: 'Wrong id format',
};

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY_LENGTH = 1;

const validateName = (name) => {
  if (name.length < MIN_NAME_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: errors.nameLength,
      },
    };
  }
  return {};
};

const validateQuantity = (quantity) => {
  if (parseInt(quantity, 10) < MIN_QUANTITY_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: errors.quantityLength,
      },
    };
  }
  return {};
};

const validateQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: errors.quantityType,
      },
    };
  }
  return {};
};

const validateProduct = (product) => {
  if (!product) {
    return {
      err: {
        code: 'invalid_data',
        message: errors.idInvalid,
      },
    };
  }
  return {};
};

// const validate

// const validateName = (name, quantity) => {
//   if (name.length < MIN_NAME_LENGTH) {
//     return {
//       err: {
//         status: 422,
//         message: '"name" length must be at least 5 characters long',
//       },
//     };
//   }
// };

module.exports = { validateName, validateQuantity, validateQuantityType, validateProduct };
