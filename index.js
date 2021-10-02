const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const productsRoutes = require('./routes/products');
const salesRoutes = require('./routes/sales');
const errorMiddleware = require('./middlewares/errorHandling');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use(errorMiddleware);
app.listen(PORT, () => console.log('Store manager rodando na porta 3000'));
