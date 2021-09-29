const express = require('express');
const bodyParser = require('body-parser');

const Product = require('./controllers/Product');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Product.create);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
