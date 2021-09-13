const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productsController.createProduct);

app.listen(3000, () => { console.log('Ouvindo na porta 3000'); });
