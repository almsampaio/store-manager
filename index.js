const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`App online at port ${PORT}`);
});
