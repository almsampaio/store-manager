const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const { validateName, validateQuantity } = require('./middlewares/productsMiddlewares');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateName, validateQuantity, productController.create);

app.listen(3000, () => {
  console.log('#vqv app rodando na 3000');
});
