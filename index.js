const express = require('express');
const bodyParser = require('body-parser').json();

const productsRoutes = require('./routes/productsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const { handleError } = require('./middlewares');

const app = express();
const PORT = 3000;

app.use(bodyParser);

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use('/', handleError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
