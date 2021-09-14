const express = require('express');
const bodyParser = require('body-parser');

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
} = require('./src/Controllers/productsController');

const app = express();

app.use(bodyParser.json());

const PORT = '3000';

app.get('/products', getAllProducts);

app.get('/products/:id', getProductById);

app.post('/products', addProduct);

app.put('/products/:id', updateProduct);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
