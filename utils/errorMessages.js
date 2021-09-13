const errorMessages = {
  invalidData: 'invalid_data',
  characterLength: '"name" length must be at least 5 characters long',
  quantity: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
  productExists: 'Product already exists',
  wrongIdFormat: 'Wrong id format',
  invalidIdOrQtd: 'Wrong product ID or invalid quantity',
};

module.exports = errorMessages;
