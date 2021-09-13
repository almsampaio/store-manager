const productsValidate = (name, quantity) => {
  if (parseInt(name.length, 10) < 5) {
    return { 
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long',
      },
    };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number',
      },
    };
  }
  if (quantity < 0 || quantity === 0) {
    return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

module.exports = {
  productsValidate,
};