const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(bodyParser.json());

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const localhost = 3000;

const PORT = process.env.PORT || localhost;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
