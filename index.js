const express = require('express');
const bodyParse = require('body-parser');
const productsController = require('./controllers/productsController');

const app = express();
app.use(bodyParse.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);

app.post('/products', productsController.create);

app.listen(PORT, () => {
  console.log('Aplicação tá on');
});
