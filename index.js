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
app.get('/products', Product.getAll);
app.get('/products/:id', Product.findById);
app.put('/products/:id', Product.update);

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
