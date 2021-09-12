module.exports = (req, res, next) => {
  try {
    const { name } = req.body;
    const nameValid = /^.{5,}$/g;
  if (!name || name === '') {
    return res.status(404).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (!nameValid.test(name)) {
    return res.status(422).json({
      message: "\"name\" length must be at least 5 characters long",
    });
  }
  next();
  } catch (err) {
    console.log(err.message);
  }
};
