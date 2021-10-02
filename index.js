const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { createProduct } = require('./controllers/controllerProducts');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Aplicação rodando', PORT));

app.post('/products', rescue(createProduct));

app.use((err, _req, res) => {
  const {
    status,
    err: {
      code,
      message,
    },
  } = err;
  res.status(status).json({
    err: {
      code,
      message,
    },
  });
});