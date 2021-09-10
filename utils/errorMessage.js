// generate error by Flavio Franco.

const generateError = (code, message) => {
  const err = { err: { code, message } };
  return err;
};

module.exports = generateError;
