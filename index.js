const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server rodando na porta 3000');
});

const { validateCreate } = require('./middlewares/validate');
const productController = require('./controllers/productController');

app.post('/products', [
  validateCreate,
  productController.create,
]);

app.use((err, req, res, _next) => {
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
