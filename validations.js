const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({ err: 
      { message: '"name" length must be at least 5 characters long', code: 'invalid_data' },
    });
  }
  next();
};

const validateNameExists = (req, res, next) => {
  const { name } = req.body;

  if () {
    return res.status(422).json({ err: 
      { message: 'Product already exists', code: 'invalid_data' },
    });
  }
  next();
};

module.exports = { 
  validateName, 
  validateNameExists,
};