const bodyParser = require('body-parser');
const express = require('express');
const productsController = require('./controllers/productsControler');

const app = express();
app.use(bodyParser.json());

app.post('/products', productsController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Rodando a pau'));
