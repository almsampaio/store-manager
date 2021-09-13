const app = require('express')();
const bodyParser = require('body-parser');
const { createProductController } = require('./controllers');
const { validName, validQuantity } = require('./middlewares');

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validName, validQuantity, createProductController);

app.listen(PORT, () => {
  console.log('Online: ', PORT);
});
