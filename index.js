const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server rodando na porta 3000');
});

// ----------------------------------------------------- PRODUCT ----------------------------------------------------- //

const productsRouter = require('./router/productsRouter');

app.use('/products', productsRouter);

app.use((err, _req, res, _next) => {
  const { details } = err;
  const error = {
    err: {
      code: 'invalid_data',
      message: details[0].message,
    },
  };

  return res.status(422).json(error);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
