const express = require('express');
const bodyParser = require('body-parser');
const productsRouters = require('./routers/productsRouters');
const salesRouters = require('./routers/salesRouters');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouters);

app.use('/sales', salesRouters);

app.listen(PORT, () => console.log('RUN SERVER'));