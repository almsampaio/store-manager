const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routers/productsRouter');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/products', productsRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const { env: { PORT } } = process;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
