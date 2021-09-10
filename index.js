// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./controller/products/ProductsController');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(productRoutes);

app.get('/', (_request, response) => {
  response.send();
});

app.get('*', (_req, res) => res.status(404).json({ message: 'Not Found' }));

app.listen(PORT, () => console.log(`Server Working on ${PORT} `));