require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productsRouter = require('./routes/products');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use('/products', productsRouter);

app.use((err, _req, res, _next) => {
  const { status, code, message } = err;

  res.status(status).json({
    err: {
      code,
      message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
