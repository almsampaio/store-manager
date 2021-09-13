const productService = require('../service/productService');
const schema = require('../validations/validations');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const validate = schema.validate({ name, quantity });
    if (validate.error) throw validate.error.details[0].message;
    const { err, data } = await productService.create(name, quantity);
    if (err) return res.status(422).json({ err });
    return res.status(201).json(data);
  } catch (e) {
    console.log(e);
    res.status(422).json({ err: { code: 'invalid_data', message: e } });
  }
};

module.exports = {
  create,
};
