const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

const Products = require('./controllers/products');

app.post('/products', Products.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.post('/products', null);

app.listen(PORT, () => console.log('Ouvindo na porta 3000'));
