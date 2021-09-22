const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();
const PORT = 3000;

app.use(bodyParser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
