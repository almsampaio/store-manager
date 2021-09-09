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

// Products
app.post('/products', Validate.validName, Validate.validQuantity, Products.create);
app.get('/products', Products.getAll);
app.get('/products/:id', Products.getById);
app.delete('/products/:id', Products.remove);
app.put('/products/:id', Validate.validName, Validate.validQuantity, Products.update);

// Sales
app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.getById);
