const getAllSales = ('/', (_req, res) => {
  const frase = 'Hello World';

  return res.status(200).end(frase);
});

module.exports = {
  getAllSales,
};
