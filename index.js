const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const error = require('./middlewares/error');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter, error);
app.use('/sales', salesRouter, error);

app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));
