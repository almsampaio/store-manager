const codes = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
  stockProblem: 'stock_problem',
};

const messages = {
  productAlreadyExists: 'Product already exists',
  productNameLength: '"name" length must be at least 5 characters long',
  quantityLarger: '"quantity" must be larger than or equal to 1',
  beANumber: '"quantity" must be a number',
  noData: 'There are no data',
  wrongId: 'Wrong id format',
  invalidQuantity: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
  wrongSaleId: 'Wrong sale ID format',
  amountNotPermited: 'Such amount is not permitted to sell',
};

module.exports = {
  codes,
  messages,
};
