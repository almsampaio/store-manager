const createSale = (req, res) => {
  const all = req.body;

  res.status(201).json(all);
};

module.exports = {
  createSale,
};