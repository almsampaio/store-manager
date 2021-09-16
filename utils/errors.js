const shortName = {
  code: 'invalid_data',
  message: '"name" length must be at least 5 characters long',
  status: 422,
};

const productAlreadyExists = {
  status: 422,
  message: 'Product already exists',
  code: 'invalid_data',
};

const shortQuantity = {
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
  status: 422,
};

const quantityMustBeNumber = {
  code: 'invalid_data',
  message: '"quantity" must be a number',
  status: 422,
};

const wrongIdFormat = {
  code: 'invalid_data',
  message: 'Wrong id format',
  status: 422,
};

const wrongIdOrQuantity = {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
  status: 422,
};

const saleNotFound = {
  code: 'not_found',
  message: 'Sale not found',
  status: 404,
};

module.exports = {
  shortName,
  productAlreadyExists,
  shortQuantity,
  quantityMustBeNumber,
  wrongIdFormat,
  wrongIdOrQuantity,
  saleNotFound,
};