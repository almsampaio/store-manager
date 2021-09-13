const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/ProductsRoutes');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
