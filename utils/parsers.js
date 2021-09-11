const camelToSnake = (str) => {
  const arrCamel = str.split('');

  const arrSnake = arrCamel.map((string) => {
    if (string === string.toUpperCase()) {
      const snakeStr = `_${string.toLowerCase()}`;

      return snakeStr;
    }

    return string;
  });

  const snake = arrSnake.join('');

  return snake;
};

module.exports = { camelToSnake };
