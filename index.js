const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = require('./router');

const PORT = 3000;

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.listen(PORT, () => console.log('Aplicação rodando', PORT));
