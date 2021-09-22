const express = require('express');

const app = express();
const bodyparser = require('body-parser');

const { create, getAllProducts, getById } = require('./controller/Products');

app.use(bodyparser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', create);
app.get('/products', getAllProducts);
// app.get('/products', getById);

app.listen(3000, () => {
  console.log('aplicação rodando');
});
