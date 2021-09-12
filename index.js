const express = require('express');
const bodyParse = require('body-parser');

const validatesProducts = require('./middlewares/validateProducts');
const validatesSales = require('./middlewares/validateSales');

const { 
    createProduct, 
    getAllProducts, 
    findById,
    deleteByid,
    editProduct,
  } = require('./controllers/products');

const {
  createSale,
} = require('./controllers/sales');

const PORT = '3000';
const app = express();

const {
  validateProductName,
  validateProductQty,
  validateId,
} = validatesProducts;

const {
  validateItensSold,
} = validatesSales;

app.use(bodyParse.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validateProductName, validateProductQty, createProduct);
app.get('/products', getAllProducts);
app.get('/products/:id', validateId, findById);
app.put('/products/:id', validateProductQty, validateProductName, editProduct);
app.delete('/products/:id', validateId, deleteByid);

app.post('/sales', validateItensSold, createSale);

app.listen(PORT, () => {
  console.log('hello world');
});
