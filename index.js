const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();
app.use(bodyParser.json());

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => console.log('Online na porta', PORT));
