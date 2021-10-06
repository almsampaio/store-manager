// não remova esse endpoint, e para o avaliador funcionar
// add commit inicial
app.get("/", (_request, response) => {
  response.send();
});
