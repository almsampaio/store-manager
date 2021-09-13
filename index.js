const express = require('express');
const bodyParser = require('body-parser');
const { ProductsControler } = require('./Controllers/ProductsController');

const app = express();

const PORT = 3000;

// process.stdout.write('\033c');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/test', (_request, response) => {
  response.status(200).send('TÁ FUNCIONANDO');
});

app.post('/products', ProductsControler);

app.listen(PORT, () => {
  console.log(`Conexão aberta na porta ${PORT}`);
});
