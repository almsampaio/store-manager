const { ObjectId } = require('mongodb');

module.exports = {
  minLength(value, length) {
    const valid = value.length >= length;
    return {
      textField(valueTitle) {
        if (!valid && typeof value === 'string') {
          throw new Error(`"${valueTitle}" length must be at least 5 characters long`);
        }
      },
    };
  },

  minValue(value, min) {
    const valueIsObject = typeof value === 'object';
    const parsedValue = valueIsObject ? Object.values(value)[0] : value;
    const valid = parsedValue >= min;
    if (!valid && typeof parsedValue === 'number') {
      throw new Error(
        `"${valueIsObject ? Object.keys(value) : 'Value'}" must be larger than or equal to ${min}`,
      );
    }
  },
  
  typeOfNumber(value) {
    const valueIsObject = typeof value === 'object';
    const valid = typeof (valueIsObject ? Object.values(value)[0] : value) === 'number';
    if (!valid) {
      throw new Error(
        `"${valueIsObject ? Object.keys(value) : 'Value'}" must be a number`,
      );
    }
  },
  
  isUnique(found, title) {
    if (found) {
      throw new Error(`${title} already exists`);
    }
  },

  async id(idReceived, callback, errorMessage) {
    const isNotValid = !ObjectId.isValid(idReceived);
    const error = () => { throw new Error(errorMessage); };

    if (isNotValid) error();

    const result = await callback();

    if (!result) error();

    return result;
  },
};
