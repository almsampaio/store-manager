const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';
// const statusOK = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', salesRoutes);

app.listen(PORT, () => {
  console.log(`App online at port ${PORT}`);
});
