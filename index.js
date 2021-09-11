const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);

app.get('/products', Products.findAll);

app.get('/products/:id', Products.findById);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
