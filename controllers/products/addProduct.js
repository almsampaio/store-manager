const addProduct = async (req, res) => {
  const { name, quantity } = req.body;

  res.status(201).json({ name, quantity });
};

module.exports = addProduct;
