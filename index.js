const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productsRouter = require('./routers/productsRouter');

app.use('/products', productsRouter);

const salesRouter = require('./routers/salesRouter');

app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => { console.log('Api rodando na porta 3000'); }); 