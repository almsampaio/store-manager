const express = require('express');
const bodyparser = require('body-parser');

const controller = require('./controllers/products');

const app = express();
app.use(bodyparser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controller.create); 
app.get('/products', controller.getAll);
app.get('/products/:id', controller.getById);

app.listen(PORT, () => {
  console.log('Online');
});