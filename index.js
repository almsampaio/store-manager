// projeto realizado com ajuda dos estudantes Nilson Ribeiro e Adelino Junior.

const express = require('express');
const bodyParser = require('body-parser');
const { 
  addProduct, 
  getAll, 
  getById, 
  update, 
  remove } = require('./controllers/products');

const { 
  validName, 
  validQuantity, 
  validQuantitySales } = require('./services/validation');

const { 
  addSales, 
  getAllSales, 
  getSalesById, 
  updateSales, 
  removeSales } = require('./controllers/sales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('online'); });

// product
app.post('/products', validName, validQuantity, addProduct);
app.get('/products', getAll);
app.get('/products/:id', getById);
app.put('/products/:id', validName, validQuantity, update);
app.delete('/products/:id', remove);

// sales
app.post('/sales', validQuantitySales, addSales);
app.get('/sales', getAllSales);
app.get('/sales/:id', getSalesById);
app.put('/sales/:id', validQuantitySales, updateSales);
app.delete('/sales/:id', removeSales);
