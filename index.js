// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});
