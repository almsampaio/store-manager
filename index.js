const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/ProductsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Requisito 01
app.post('/products', ProductsController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
