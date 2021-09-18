const express = require('express');
const bodyParser = require('body-parser');
const rotaProducts = require('./rotas/rotaProducts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', rotaProducts);

app.listen(3000, () => {
  console.log('Online');
});
