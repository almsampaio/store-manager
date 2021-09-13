const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const salesRouter = require('./routes/sales');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(port, () => console.log('partiu'));