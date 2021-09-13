const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./controllers/ProductsController');
const routerSales = require('./controllers/SalesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProducts);
app.use('/sales', routerSales);

const PORT = 3000;

app.listen(PORT, () => console.log(`listering on port ${PORT}`));
