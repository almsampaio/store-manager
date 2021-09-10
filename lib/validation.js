module.exports = {
  minLength(value, length) {
    const valid = value.length >= length;
    return {
      textField(valueTitle) {
        if (!valid) {
          throw new Error(`"${valueTitle}" length must be at least 5 characters long`);
        }
      },
    };
  },

  minValue(value, min) {
    const valueIsObject = typeof value === 'object';
    const valid = (valueIsObject ? Object.values(value)[0] : value) >= min;
    if (!valid) {
      throw new Error(
        `"${valueIsObject ? Object.keys(value) : 'Value'}" must be larger than or equal to ${min}`,
      );
    }
  },
  
  isUnique(found, title) {
    if (found) {
      throw new Error(`${title} already exists`);
    }
  },
};
