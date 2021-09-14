const express = require('express');

const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products/', productsController.createProduct);
app.post('/sales/', salesController.createSale);

app.listen(3000, () => { console.log('Ouvindo na porta 3000'); });
