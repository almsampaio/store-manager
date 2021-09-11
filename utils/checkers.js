const hasToUpperCase = (str) =>
  str.split('').some((letter) => letter === letter.toUpperCase());

module.exports = { hasToUpperCase };
