const express = require('express');

const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
