const service = require('../service/salesService');

const addNewSale = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const operation = service.addNewSale({ name, quantity });
    res.status(200).json(operation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
    addNewSale,
};