const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const rescue = require('express-rescue');
const { createProduct, getAllProducts, productById } = require('./controllers/controllerProducts');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Aplicação rodando', PORT));

app.post('/products', rescue(createProduct));
app.get('/products', rescue(getAllProducts));
app.get('/products/:id', rescue(productById));

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