const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.create);

app.listen(3000, () => console.log('Olha noix ai na porta 3000'));