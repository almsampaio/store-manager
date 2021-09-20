const express = require('express');
const bodyParser = require('body-parser');
const produtcsController = require('./controllers/productsControllers');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', produtcsController); // Rotas a partir de /products

const PORT = '3000';
app.listen(PORT, () => { console.log('Online'); });//
