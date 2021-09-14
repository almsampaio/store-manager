const { schemaSale } = require('../validations/validations');

const validationIDAndQuantity = async (req, res, next) => {
  const { body } = req;
  const validate = schemaSale.validate(body);
  if (validate.error) {
  return res.status(422)
  .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }); 
}
  next();
};

module.exports = validationIDAndQuantity;
