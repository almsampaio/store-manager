const express = require('express');
const BodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const Validate = require('./middlewares/validate');

const PORT = 3000;
const app = express();
app.use(BodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.put('/products/:id', Validate.checkName,
 Validate.checkProductQuantify, Products.updateProduct);
app.post('/products', Validate.checkName, Validate.checkProductQuantify, Products.create);
app.get('/products/:id', Products.getById);
app.get('/products', Products.getAll);
app.delete('/products/:id', Products.deleteProduct);

app.put('/sales/:id', Validate.checkSales, Sales.updateSales);
app.get('/sales/:id', Sales.getById);
app.get('/sales/', Sales.getAllSales);
app.post('/sales', Validate.checkSales, Sales.createSales); // 
