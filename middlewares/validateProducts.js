// const productModel = require('../models/productModel');
const schema = require('../validations/validations');

const validationNameAndQuantity = async (req, _res) => {
  const { name, quantity } = req.body;
  const validate = schema.validate({ name, quantity });
  if (validate.error) return validate.error.details[0].message;
  return false;
};

module.exports = {
  validationNameAndQuantity,
};
