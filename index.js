const bodyParser = require('body-parser');

// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('API in running!'));
