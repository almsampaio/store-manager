const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/productsControler');

const app = express();
app.use(bodyParser.json());

app.get('/products/:id', productsController.getProductById);
app.post('/products', productsController.create);
app.get('/products', productsController.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Rodando a pau'));
