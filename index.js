const express = require('express');
const bodyparser = require('body-parser');

const controller = require('./controllers/products');
const controllerSales = require('./controllers/sales');

const app = express();
app.use(bodyparser.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', controller.getById);
app.put('/products/:id', controller.productUpdate);
app.delete('/products/:id', controller.productDelete);
app.post('/products', controller.create); 
app.get('/products', controller.getAll);

app.post('/sales', controllerSales.createSales); 
app.get('/sales', controllerSales.getAllSales);
app.get('/sales/:id', controllerSales.getById); 
app.put('/sales/:id', controllerSales.updateSales); 
app.delete('/sales/:id', controllerSales.deleteSale); 
app.listen(PORT, () => {
  console.log('Online');
});