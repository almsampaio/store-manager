const PORT = 3000;
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const productsRoute = require('./routes/productsRoute');
const salesRouter = require('./routes/salesRouter');

app.use('/products', productsRoute);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
  console.log(`Acessar: http://localhost:${PORT}`);
});
