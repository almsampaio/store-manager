const errorsMessages = {
  code: 'invalid_data',
  notFound: 'not_found',
  stockProblem: 'stock_problem',
  saleNotFound: 'Sale not found',
  wrongSaleIdFormat: 'Wrong sale ID format',
  suchAmountIsNotpermittedToSell: 'Such amount is not permitted to sell',
  nameLengthGT: '"name" length must be at least 5 characters long',
  productAlreadyExists: 'Product already exists',
  qtyMustBeANumber: '"quantity" must be a number',
  qtyGTEOne: '"quantity" must be larger than or equal to 1',
  wrongIdFormat: 'Wrong id format',
  productDontFound: 'Product dont found',
};

module.exports = {
  errorsMessages,
};