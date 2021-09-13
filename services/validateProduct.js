const validate = (name, quantity) => {
  const minimumNameLength = 5;
  const minimumQuantity = 1;
  console.log('Validado Nome');

  if (name.length < minimumNameLength) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
  }
  
  console.log('Validado Quantidade');
  if (quantity < minimumQuantity) {
    return {
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
  }

  console.log('Validado Tipo');
  if (typeof (quantity) === 'string') {
    return {
      err: {
        code: 'invalid_data', message: '"quantity" must be a number' } };
  }
};

module.exports = {
  validate,
};