const app = require('express')();
const bodyParser = require('body-parser');
const { create, getAll, getById } = require('./controllers/productController');
const { validName, validQuantity } = require('./middlewares');
const { validId } = require('./middlewares/productMid');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validName, validQuantity, create);

app.get('/products', getAll);

app.get('/products/:id', validId, getById);

app.listen(PORT, () => {
  console.log('Online: ', PORT);
});
