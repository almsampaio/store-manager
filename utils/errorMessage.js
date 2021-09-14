const errorMessage = {
    invalidData: 'invalid_data',
    productExists: 'Product already exists',
    minimumQty: '"quantity" must be larger than or equal to 1',
    qtyMustBeANumber: '"quantity" must be a number',
    wrongIdFormat: 'Wrong id format',
    nameMinimumLength: '"name" length must be at least 5 characters long',
    problemIdOrQty: 'Wrong product ID or invalid quantity',
    notFound: 'not_found',
    saleNotFound: 'Sale not found',
    wrongSaleIdFormat: 'Wrong sale ID format',
    amountNotpermitted: 'Such amount is not permitted to sell',
    stockProblem: 'stock_problem',
  };
  
  module.exports = {
    errorMessage,
  }; 