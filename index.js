const express = require('express');
const bodyParse = require('body-parser');

const validates = require('./middlewares');
const { 
    createProduct, 
    getAllProducts, 
    findById,
    deleteByid,
  } = require('./controllers/products');

const PORT = '3000';
const app = express();

const {
  validateProductName,
  validateProductQty,
  validateId,
} = validates;

app.use(bodyParse.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQty, createProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', validateId, findById);
app.delete('/products/:id', validateId, deleteByid);

app.listen(PORT, () => {
  console.log('hello world');
});
