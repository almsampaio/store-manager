const productModel = require('../models/productModel');

const validateName = async (name, quantity) => {
    if (name.length < 5) {
      return '"name" length must be at least 5 characters long';
    }

    if (quantity <= 0) {
      return '"quantity" must be larger than or equal to 1';
    }

    if (typeof (quantity) === 'string') {
      return '"quantity" must be a number';
    }

    return null;
};

const addValidation = async (name, quantity) => {
  const answer = await validateName(name, quantity);

  const existingName = await productModel.existingName(name);

  if (existingName !== null) {
      return 'Product already exists';
  }
  if (answer === null) {
      const create = await productModel.add(name, quantity);
      return create;
  } 
      return answer;
};

const updateValidation = async (id, name, quantity) => {
  const answer = await validateName(name, quantity);
  if (answer === null) {
      const update = await productModel.update(id, name, quantity);
      return update;
  }
  return answer;
};

const deleteValidation = async (id) => {
  const existingId = await productModel.existingId(id);

  if (existingId === null) {
      return 'Wrong id format';
  }
  const update = await productModel.exclude(id);
  return update;
}; 

module.exports = { validateName, addValidation, updateValidation, deleteValidation }; 
