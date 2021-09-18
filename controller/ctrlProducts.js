const service = require('../service/servProducts');

const getAll = async (req, res) => {
  try {
    const getAllProducts = await service.getAllProducts();
    return res.status(200).json(getAllProducts);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
};
