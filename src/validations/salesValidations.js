const salesValidate = (data) => {
  let isInvalid = false;
  data.forEach((elem) => {
    if (typeof elem.quantity !== 'number') {
      isInvalid = true;
    }
    if (elem.quantity < 0 || elem.quantity === 0) {
      isInvalid = true;
    }
  });
  return isInvalid;
};

module.exports = {
  salesValidate,
};

// 