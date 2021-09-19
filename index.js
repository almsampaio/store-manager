const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const {
  getAllProducts,
  createNewProduct,
  getById,
  updateProduct,
  deleteProduct,
} = require('./controllers/products');
const { validName, validQuantity } = require('./validations/products');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} xablau`);
});

app.post('/products', validName, validQuantity, createNewProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', getById);
app.put('/products/:id', validName, validQuantity, updateProduct);
app.delete('/products/:id', deleteProduct);