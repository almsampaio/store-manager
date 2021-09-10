const express = require('express');
const bodyParse = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParse.json());

app.listen(port, () => console.log(port));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
