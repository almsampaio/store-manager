const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const teste = require('./routes/index');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', teste);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} xablau`);
});
