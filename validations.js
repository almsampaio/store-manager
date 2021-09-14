const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({ err: 
      { message: '"name" length must be at least 5 characters long', code: 'invalid_data' },
    });
  }
  next();
};

// const validateNameExists = (req, res, next) => {
//   const { name } = req.body;

//   const productName = await model.getByName(name);

//   if (productName) {
//     return res.status(422).json({ err: 
//       { message: 'Product already exists', code: 'invalid_data' },
//     });
//   }
//   next();
// };

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity <= 0) {
    return res.status(422).json({ err: 
      { message: '"quantity" must be larger than or equal to 1', code: 'invalid_data' },
    });
  }

  if (typeof (quantity) === 'string') {
    return res.status(422).json({ err: 
      { message: '"quantity" must be a number', code: 'invalid_data' },
    });
  }
  next();
};

module.exports = { 
  validateName, 
  validateQuantity,
  // validateNameExists,
};