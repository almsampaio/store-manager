const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(3000, console.log('🚀 Backend is running!'));
