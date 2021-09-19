const express = require('express');

const bodyParser = require('body-parser').json;

const controller = require('./controllers/productsController');

const app = express();

app.use(bodyParser());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', controller.createNewProduct);

app.get('/products', controller.getAllProducts);

app.get('/products/:id', controller.getProductByID);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Online on PORT: ${PORT}`);
});
