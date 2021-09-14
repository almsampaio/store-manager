const { schemaProduct } = require('../validations/validations');

const validationNameAndQuantity = async (req, res, next) => {
  const { name, quantity } = req.body;
  const validate = schemaProduct.validate({ name, quantity });
  if (validate.error) {
  return res.status(422)
  .json({ err: { code: 'invalid_data', message: validate.error.details[0].message } });
}
  next();
};

module.exports = validationNameAndQuantity;
