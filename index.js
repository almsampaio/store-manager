const express = require('express');
const bodyParser = require('body-parser');
const rota = require('./controle/ctrlProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/test', rota.create);

app.listen(3000, () => {
  console.log('Online');
});
