const express = require('express');
const bodyParser = require('body-parser');

const ProductsController = require('./controllers/Products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsController.create);

app.listen(3000, console.log('🚀 Backend is running!'));
