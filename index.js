const app = require('express')();
const bodyParser = require('body-parser');
const { createProductController, getAllProducts } = require('./controllers');
const { validName, validQuantity } = require('./middlewares');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validName, validQuantity, createProductController);

app.get('/products', getAllProducts);

app.listen(PORT, () => {
  console.log('Online: ', PORT);
});
