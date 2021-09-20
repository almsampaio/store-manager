const WRONG_INPUT_FORMAT_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong input format',
  },
  status: 422,
};

const WRONG_NAME_LENGTH_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
  status: 422,
};

const NAME_ALREADY_EXISTS_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
  status: 422,
};

const WRONG_QUANTITY_VALUE_SIZE_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
  status: 422,
};

const WRONG_QUANTITY_INPUT_TYPE_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
  status: 422,
};

const WRONG_ID_FORMAT_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
  status: 422,
};

const WRONG_PRODUCID_OR_INVALID_QUANTIY_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
  status: 422,
};

const NOT_AMOUNT_PERMISE_TO_SELL_MESSAGE = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
  status: 422,
};

const SALE_NOT_FOUND = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
  status: 404,
};

const WRONG_SALE_ID_FORMAT_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
  status: 422,
};

module.exports = {
  WRONG_INPUT_FORMAT_MESSAGE,
  WRONG_NAME_LENGTH_MESSAGE,
  NAME_ALREADY_EXISTS_MESSAGE,
  WRONG_QUANTITY_VALUE_SIZE_MESSAGE,
  WRONG_QUANTITY_INPUT_TYPE_MESSAGE,
  WRONG_ID_FORMAT_MESSAGE,
  WRONG_PRODUCID_OR_INVALID_QUANTIY_MESSAGE,
  NOT_AMOUNT_PERMISE_TO_SELL_MESSAGE,
  SALE_NOT_FOUND,
  WRONG_SALE_ID_FORMAT_MESSAGE,
};
