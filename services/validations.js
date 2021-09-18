const Joi = require('@hapi/joi');

const joiValidation = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

function productsValidation(req, res, next) {
  const result = joiValidation.validate(req.body);
  if (result.error) {
    res.status(422)
    .json({ err: { code: 'invalid_data', message: result.error.details[0].message } });
  }
  next();
}

// function idValid(req, res, next) {
//   const { id } = req.params;
//   const result = 
//   if(!id || id !== req.body.id) {
//     return res.status(422).json({ err: { code: 'invalid_id', message:}})
//   }
// }

module.exports = {
  productsValidation,
};
