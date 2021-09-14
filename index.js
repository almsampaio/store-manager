// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Product.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});