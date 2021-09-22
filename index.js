const express = require('express');

const app = express();
const bodyparser = require('body-parser');

const { create, getAll, getById } = require('./controller/Products');

app.use(bodyparser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', create);
app.get('/products', getAll);
app.get('/products', getById);

app.listen(3000, () => {
  console.log('aplicação rodando');
});
