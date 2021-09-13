const express = require('express');
const bodyParser = require('body-parser');
const { products, sales } = require('./controller/index');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', products.createProduct);
app.post('/sales', sales.createSale);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Here we go!!'));
