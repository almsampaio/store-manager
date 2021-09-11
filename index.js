const express = require('express');
const products = require('./routes/products');
const sales = require('./routes/sales');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use('/sales', sales);

app.listen(PORT, () => console.log('Server is running!'));
