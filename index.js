const app = require('express')();
const bodyParser = require('body-parser').json();
const rescue = require('express-rescue');
const { createProduct } = require('./controllers/productsController');
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(createProduct));

app.use((err, _req, res, _next) => {
  const { status, err: { code, message } } = err;
  res.status(status).json({ err: { code, message } });
});

app.listen(PORT, () => {
  console.clear();
  console.log(`App listening on port ${PORT}`);
});
