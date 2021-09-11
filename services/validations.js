function nameValidation(name) {
  if (name.length < 5 || name.includes(' ')) return false;
  return true;
}

module.exports = nameValidation;
