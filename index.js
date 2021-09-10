const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsRouter = require('./routes/products');

app.use('/products', productsRouter);

app.listen(port, () => console.log('partiu'));