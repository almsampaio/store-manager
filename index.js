require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/Products');
const salesRoutes = require('./routes/Sales');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Running @ port ${PORT}`);
});
