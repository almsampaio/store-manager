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
  
  isUnique(found, title) {
    if (found) {
      throw new Error(`${title} already exists`);
    }
  },
};
